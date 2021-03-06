import { Component, OnInit } from '@angular/core';
import { AssetDef } from '../asset-def';
import { AssetType } from '../asset-type';
import { AssetDefService } from '../asset-def.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-asset-def',
  templateUrl: './asset-def.component.html',
  styleUrls: ['./asset-def.component.scss']
})
export class AssetDefComponent implements OnInit {
  title= 'Asset Definition';
  assetForm:FormGroup;
  assettypes: Observable<AssetType[]>;
  asset: AssetDef=new AssetDef();

  constructor(private assetService: AssetDefService,
    private router: Router, private formBuilder: FormBuilder, private toastr:ToastrService,private authService: AuthService) { }

  ngOnInit() {

    this.reloadData();

  }

  reloadData(){

    this.assetForm=this.formBuilder.group({
      ad_name : ['',Validators.compose([Validators.required])],
      ad_type_id: ['',Validators.compose([Validators.required])],
      ad_class: ['',Validators.compose([Validators.required])]
    });
    
    this.assettypes=this.assetService.getAssetTypes();
    console.log(this.assettypes);

  }

  addAsset()
  {
    this.asset.ad_name=this.assetForm.controls.ad_name.value;
    this.asset.ad_type_id=this.assetForm.controls.ad_type_id.value;
    this.asset.ad_class=this.assetForm.controls.ad_class.value;
    this.assetService.addAsset(this.asset).subscribe(res=>{
      if(res==1)
      this.toastr.success('Asset Added');
      else
      this.toastr.error('Asset is already Exists');
    });
    
    this.reloadData();
    
  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }
}
