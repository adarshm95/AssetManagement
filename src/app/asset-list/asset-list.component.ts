import { Component, OnInit } from '@angular/core';
import { AssetDefService } from '../asset-def.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AssetDef } from '../asset-def';
import { ToastrService } from 'ngx-toastr';
import { AssetType } from '../asset-type';
import { AuthService } from '../auth.service';
import { element } from 'protractor';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {

  public popoverTitle: string = 'Are you Sure???';
  public popoverMessage: string = 'If sure, click Confirm...';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  atype:AssetType;
  assets: Observable<AssetDef[]>
  assettypes: Observable<AssetType[]>
  typeid: number;
  typename: string;

  constructor(private assetService: AssetDefService, private authService: AuthService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }

  AssetList(){

  }

  reloadData(){
    this.assettypes=this.assetService.getAssetTypes();
    this.assets=this.assetService.getAssetList();

  }

  deleteasset(id:number){

    this.assetService.deleteAsset(id).subscribe(data=>{
      console.log(data);
      this.toastr.error('Deleted');
      this.reloadData();
    })
  }

  onOptionsSelected(value: number){
if(value==null||value==0){
  this.assets=this.assetService.getAssetList();
}

else{
  this.assets= this.assetService.getAssets(value);
}

  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');
  }

}
