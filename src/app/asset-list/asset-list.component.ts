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

  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Popover description';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  atype:AssetType;
  assets: Observable<AssetDef[]>
  assettypes: Observable<AssetType[]>
  typeid: number;
  typename: string;

  constructor(private assetService: AssetDefService, private authservice: AuthService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }

  AssetList(){

  }

  reloadData(){
    this.assettypes=this.assetService.getAssetTypes();
    this.assets=this.assetService.getAssetList();

    this.assets.forEach(x=>{
      x.forEach(element=>{
        this.typeid=element["ad_type_id"];
        console.log(this.typeid);
        this.assettypes.forEach(y=>{
         y.forEach( element=>{
          if(element["at_id"]==this.typeid){
            this.typename=element["at_name"];
            console.log(this.typename);

          }
        })
        })

        element["ad_type_name"]=this.typename;
      })
    })
   

  }

  deleteasset(id:number){

    this.assetService.deleteAsset(id).subscribe(data=>{
      console.log(data);
      this.toastr.error('Deleted');
      this.reloadData();
    })
  }

  Logout(){
    this.authservice.logout();
    this.router.navigateByUrl('logout');
  }


}
