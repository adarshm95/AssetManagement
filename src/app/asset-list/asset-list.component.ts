import { Component, OnInit } from '@angular/core';
import { AssetDefService } from '../asset-def.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AssetDef } from '../asset-def';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {

  assets: Observable<AssetDef[]>

  constructor(private assetService: AssetDefService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }

  AssetList(){

  }

  reloadData(){
    this.assets=this.assetService.getAssetList();

  }

  deleteasset(id:number){
    this.assetService.deleteAsset(id).subscribe(data=>{
      console.log(data);
      this.toastr.warning('Deleted');
      this.reloadData();
    })
  }

  Logout(){
    localStorage.removeItem('uname');
    this.router.navigateByUrl('logout');
  }

}
