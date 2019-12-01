import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../purchase-order';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseService } from '../purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.scss']
})
export class PurchaseEditComponent implements OnInit {

  purchase: PurchaseOrder= new PurchaseOrder();
  purchaseForm: FormGroup;
  id:number;

  constructor(private service: PurchaseService, private router:Router, private authService:AuthService, private route: ActivatedRoute, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit() {
    this.id=this.route.snapshot.params["id"];

    this.purchaseForm=this.formBuilder.group({
      pd_order_no : ['',Validators.compose([Validators.required])],
      pd_ad_name: ['',Validators.compose([Validators.required])],
      pd_type_name: ['',Validators.compose([Validators.required])],
      pd_qty: ['',Validators.compose([Validators.required])],
      pd_vendor_name: ['',Validators.compose([Validators.required])],
      pd_status: ['',Validators.compose([Validators.required])],
      pd_date: ['',Validators.compose([Validators.required])],
      pd_ddate: ['',Validators.compose([Validators.required])]
    }); 

    this.service.getPurchase(this.id).subscribe(x=>{
      this.purchase=x;
    })

  }


  get formControls(){
    return this.purchaseForm.controls;
  }

  updatePurchase(){
    this.purchase.pd_id=this.id;
    this.purchase.pd_date=this.purchaseForm.controls.pd_date.value;
    this.purchase.pd_ddate=this.purchaseForm.controls.pd_ddate.value;
    this.purchase.pd_status='Consignment Received';
    this.purchase.pd_order_no=this.purchaseForm.controls.pd_order_no.value;
    this.purchase.pd_ad_id=this.purchase.pd_ad_id;
    this.purchase.pd_qty=this.purchase.pd_qty;
    this.purchase.pd_type_id=this.purchase.pd_type_id;
    this.purchase.pd_vendor_id=this.purchase.pd_vendor_id;
    
    if(this.purchase.pd_date<this.purchase.pd_ddate)
    {
      this.service.updatePurchase(this.id, this.purchase).subscribe(res=>{
        this.toastr.success('Purchase Updated');
        this.router.navigateByUrl("orderhistory");
      });
    }
    else
    {
      this.toastr.warning('Purchase date must be less than Delivery date');
    }

  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }

}
