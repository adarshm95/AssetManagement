import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetDefComponent } from './asset-def/asset-def.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { PurchaseManagerComponent } from './purchase-manager/purchase-manager.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { AssetMasterComponent } from './asset-master/asset-master.component';
import { AssetMasterListComponent } from './asset-master-list/asset-master-list.component';
import { PurchaseEditComponent } from './purchase-edit/purchase-edit.component';
import { MasterOrderListComponent } from './master-order-list/master-order-list.component';


const routes: Routes = [
  { path: '#',component: LoginComponent},
  { path: '',component: LoginComponent},
  { path: 'assetdef', component: AssetDefComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: AssetEditComponent, canActivate: [AuthGuard]},
  { path: 'assets', component:AssetListComponent, canActivate: [AuthGuard]},
  { path: 'admin', component:AdminComponent, canActivate: [AuthGuard]},
  { path: 'login', component:LoginComponent, canActivate: [AuthGuard]},
  { path: 'logout', component:LoginComponent},
  { path: 'vendor', component:VendorComponent, canActivate: [AuthGuard]},
  { path: 'vendorlist', component:VendorListComponent, canActivate: [AuthGuard]},
  { path: 'editvendor/:id', component:VendorEditComponent, canActivate: [AuthGuard]},
  { path: 'user', component:PurchaseManagerComponent, canActivate: [AuthGuard]},
  { path: 'purchaseorder', component:PurchaseManagerComponent, canActivate: [AuthGuard]},
  { path: 'orderhistory', component:PurchaseListComponent, canActivate: [AuthGuard]},
  { path: 'assetmaster/:id', component:AssetMasterComponent, canActivate: [AuthGuard]},
  { path: 'masterlist', component:AssetMasterListComponent, canActivate: [AuthGuard]},
  { path: 'editPurchase/:id', component: PurchaseEditComponent, canActivate: [AuthGuard]},
  { path: 'masterorderlist', component: MasterOrderListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
