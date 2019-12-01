import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AssetType } from '../asset-type';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendorForm:FormGroup;
  assettypes: Observable<AssetType[]>;
  vendor: Vendor=new Vendor();

  constructor(private vendorService: VendorService,
    private router: Router, private formBuilder: FormBuilder, private toastr:ToastrService,private authService: AuthService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){

    this.vendorForm=this.formBuilder.group({
      vd_name : ['',Validators.compose([Validators.required])],
      vd_type: ['Supplier'],
      vd_atype_id: ['',Validators.compose([Validators.required])],
      vd_addr: ['',Validators.compose([Validators.required])],
      vd_from: ['',Validators.compose([Validators.required])],
      vd_to: ['',Validators.compose([Validators.required])]
    });
    
    this.assettypes=this.vendorService.getAssetTypes();
    console.log(this.assettypes);

  }

  addVendor(){
    this.vendor.vd_name=this.vendorForm.controls.vd_name.value;
    this.vendor.vd_type=this.vendorForm.controls.vd_type.value;
    this.vendor.vd_atype_id=this.vendorForm.controls.vd_atype_id.value;
    this.vendor.vd_addr=this.vendorForm.controls.vd_addr.value;
    this.vendor.vd_from=this.vendorForm.controls.vd_from.value;
    this.vendor.vd_to=this.vendorForm.controls.vd_to.value;
    if(this.vendor.vd_from<=this.vendor.vd_to)
    {

      this.vendorService.addVendor(this.vendor).subscribe(res=>{
        if(res==1)
        this.toastr.success('Vendor Added');
        else
        this.toastr.error('Vendor is already Exists');
      });
    this.reloadData();
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
