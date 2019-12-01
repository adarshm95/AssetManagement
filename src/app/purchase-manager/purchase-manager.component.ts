import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PurchaseService } from '../purchase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, empty } from 'rxjs';
import { AssetType } from '../asset-type';
import { Vendor } from '../vendor';
import { PurchaseOrder } from '../purchase-order';
import { ESRCH } from 'constants';

@Component({
  selector: 'app-purchase-manager',
  templateUrl: './purchase-manager.component.html',
  styleUrls: ['./purchase-manager.component.scss']
})
export class PurchaseManagerComponent implements OnInit {

  purchaseForm: FormGroup;
  assettypes: Observable<AssetType[]>;
  vendors: Observable<Vendor[]>;
  assetId: number;
  flag: number;
  flag2: number;

  purchaseorder: PurchaseOrder=new PurchaseOrder();

  constructor(private purchaseService: PurchaseService, 
    private router: Router, private formBuilder: FormBuilder, private toastr:ToastrService,private authService: AuthService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){

    this.purchaseForm=this.formBuilder.group({
      pd_order_no : ['ORD'+Math.floor((Math.random() * 10000) + 1),Validators.compose([Validators.required])],
    //  pd_ad_id: ['',Validators.compose([Validators.required])],
      pd_type_id: ['',Validators.compose([Validators.required])],
      pd_qty: ['',Validators.compose([Validators.required])],
      pd_vendor_id: ['',Validators.compose([Validators.required])]
     // pd_date: [,Validators.compose([Validators.required])],
     // pd_ddate: ['',Validators.compose([Validators.required])],
     
    });

    this.flag=0; 
    this.flag2=0;
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');

  }

  onOptionsSelected(value: number){
    this.vendors=this.purchaseService.getVendors(value);
      this.purchaseService.getVendors(value).subscribe(data=>{
        console.log("vendor",data);
      })
    this.vendors.forEach(x=>{
      x.forEach(res=>{
        if(res!=null)
        {
          this.flag2=1;
        }

      })
      if(this.flag2==1){
        this.toastr.success('Select a Vendor');
      }
      else{
        this.toastr.error('There are no Matching Vendors for the selected Asset Type','Vendors not Found!!!');
      }
    })

  }

  searchAssetType(na: string){
    this.flag=0;
    this.assettypes=this.purchaseService.getAssettypes(na);
    this.assettypes.forEach(res=>{
      res.forEach(x=>{
        console.log(x);
        if(x!=null){
          this.flag=1;
        }
      })
      if(this.flag==1){
        this.toastr.success('Select Asset Type','Asset Found!!!');
      }
      else{
        this.toastr.error('No Assets Found');
      }

    } )
    this.purchaseService.getAsset(na).subscribe(res=>{

      this.assetId=res["ad_id"];

    })
  }

  addOrder(){
    console.log(this.assetId);

    this.purchaseorder.pd_order_no=this.purchaseForm.controls.pd_order_no.value;
    console.log(this.purchaseorder.pd_order_no);
    this.purchaseorder.pd_ad_id=this.assetId; 
    this.purchaseorder.pd_qty=this.purchaseForm.controls.pd_qty.value;
    this.purchaseorder.pd_type_id=this.purchaseForm.controls.pd_type_id.value;
    this.purchaseorder.pd_vendor_id=this.purchaseForm.controls.pd_vendor_id.value;
    this.purchaseorder.pd_status='PO-Raised with Supplier';

    this.purchaseService.postPurchase(this.purchaseorder).subscribe(res=>{
      this.toastr.success('Order Placed');
      this.reloadData();
    })

  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }

}
