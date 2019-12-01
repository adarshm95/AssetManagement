import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { PurchaseOrder } from '../purchase-order';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  public popoverTitle: string = 'Cancel Order???';
  public popoverMessage: string = 'If sure, click Confirm...';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  purchases: Observable<PurchaseOrder[]>;

  constructor(private authService:AuthService, private toastr: ToastrService, private router:Router, private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.reloadData();

  }

  reloadData(){
    this.purchases=this.purchaseService.getPurchaseList();
    
    this.purchases.forEach(x=>{
    console.log(x);
    })
  }

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('logout');

  }
  cancelOrder(id: number){
    this.purchaseService.cancelPurchase(id).subscribe(res=>{
      this.toastr.success('Order Cancelled');
      this.reloadData();
    })

  }

  

}
