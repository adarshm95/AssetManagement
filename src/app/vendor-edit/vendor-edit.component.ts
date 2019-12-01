import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AssetType } from '../asset-type';
import { VendorService } from '../vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.scss']
})
export class VendorEditComponent implements OnInit {

  vendor: Vendor;
  vendorForm: FormGroup;
  assettypes: Observable<AssetType[]>;
  vendors:Observable<Vendor[]>;
  id:number;

  constructor(private service: VendorService, private router:Router, private authService:AuthService, private route: ActivatedRoute, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit() {

    this.id=this.route.snapshot.params["id"];
    console.log(this.id);
    this.vendorForm=this.formBuilder.group({
      vd_id: [Validators.required],
      vd_name : ['',Validators.compose([Validators.required])],
      vd_type: ['Supplier'],
      vd_atype_id: ['',Validators.compose([Validators.required])],
      vd_addr: ['',Validators.compose([Validators.required])],
      vd_from: ['',Validators.compose([Validators.required])],
      vd_to: ['',Validators.compose([Validators.required])]
    }); 
    this.service.getVendor(this.id).subscribe(x=>{
      this.vendor=x;
      console.log(this.vendor.vd_atype_id);
    }); 
    this.assettypes=this.service.getAssetTypes();
    console.log(this.assettypes);
  }

  get formControls(){
    return this.vendorForm.controls;
  }

  updateVendor()
    {

      this.vendor.vd_id=this.id;
      this.vendor.vd_name=this.vendorForm.controls.vd_name.value;
      this.vendor.vd_type=this.vendorForm.controls.vd_type.value;
      this.vendor.vd_atype_id=this.vendorForm.controls.vd_atype_id.value;
      this.vendor.vd_addr=this.vendorForm.controls.vd_addr.value;
      this.vendor.vd_from=this.vendorForm.controls.vd_from.value;
      this.vendor.vd_to=this.vendorForm.controls.vd_to.value;

      if(this.vendor.vd_from<=this.vendor.vd_to)
    {

      this.service.putVendor(this.id,this.vendor).subscribe(res=>{
        this.toastr.success('Vendor Updated');
        this.router.navigateByUrl("vendorlist");
      });

    }
    else{
      this.toastr.warning('From-Date cannot be Greater than To-Date');
    }
  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }
}