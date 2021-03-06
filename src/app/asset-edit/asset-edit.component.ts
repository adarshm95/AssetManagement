import { Component, OnInit } from '@angular/core';
import { AssetDef } from '../asset-def';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetDefService } from '../asset-def.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { AssetType } from '../asset-type';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {

  asset: AssetDef= new AssetDef();
  assetForm: FormGroup;
  assettypes: Observable<AssetType[]>;
  assets:Observable<AssetDef[]>;

  constructor(private service: AssetDefService, private router:Router, private authService:AuthService, private route: ActivatedRoute, private formBuilder:FormBuilder, private toastr:ToastrService) { }
  id:number;
  pdt: any;
  
  ngOnInit() {
    this.id=this.route.snapshot.params["id"];
    
    this.assetForm=this.formBuilder.group({
      ad_id: [Validators.required],
      ad_name : ['',Validators.compose([Validators.required])],
      ad_type_id: ['',Validators.compose([Validators.required])],
      ad_class: ['',Validators.compose([Validators.required])]
    }); 

    this.service.getAsset(this.id).subscribe(x=>{
      this.asset=x;
      console.log(this.asset.ad_type_name);
      console.log(this.asset.ad_type_id);
    }); 
    this.assettypes=this.service.getAssetTypes(); 
  }

  get formControls(){
    return this.assetForm.controls;
  }

  updateAsset()
    {
      this.asset.ad_id=this.id;
      this.asset.ad_name=this.assetForm.controls.ad_name.value;
      this.asset.ad_type_id=this.assetForm.controls.ad_type_id.value;
      this.asset.ad_class=this.assetForm.controls.ad_class.value;
      this.service.putAsset_def(this.id, this.asset).subscribe(res=>{
        this.toastr.success('Asset Updated');
        this.router.navigateByUrl("assets");
      });

    }

    Logout(){
      this.authService.logout();
      this.router.navigateByUrl('logout');
    }
}
