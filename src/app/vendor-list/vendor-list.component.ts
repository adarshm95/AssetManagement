import { Component, OnInit } from '@angular/core';
import { AssetType } from '../asset-type';
import { Vendor } from '../vendor';
import { Observable } from 'rxjs';
import { VendorService } from '../vendor.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetDefService } from '../asset-def.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  public popoverTitle: string = 'Are you Sure???';
  public popoverMessage: string = 'If sure, click Confirm...';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  atype:AssetType;
  vendors: Observable<Vendor[]>
  assettypes: Observable<AssetType[]>
  typeid: number;
  name: string;

  constructor(private vendorService: VendorService, private authService: AuthService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.assettypes=this.vendorService.getAssetTypes();
    this.vendors=this.vendorService.getVendorList();
   

  }

  searchVendor(value: string){
    if(value==""){
      this.vendors=this.vendorService.getVendorList();
    }
    
    else{
      this.vendors= this.vendorService.getVendors(value);
    }
    
      }

  deleteVendor(id:number){

    this.vendorService.deleteVendor(id).subscribe(data=>{
      console.log(data);
      this.toastr.error('Deleted');
      this.reloadData();
    })
  }

  onOptionsSelected(value: number){
    if(value==null||value==0){
      this.vendors=this.vendorService.getVendorList();
    }
    
    else{
      this.vendors= this.vendorService.getATypeVendor(value);
    }
    
      }

      Logout(){
        this.authService.logout();
        this.router.navigateByUrl('logout');
      }

}
