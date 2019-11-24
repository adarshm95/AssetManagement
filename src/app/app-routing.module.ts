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


const routes: Routes = [
  { path: '',component: LoginComponent},
  { path: 'assetdef', component: AssetDefComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: AssetEditComponent, canActivate: [AuthGuard]},
  { path: 'assets', component:AssetListComponent, canActivate: [AuthGuard]},
  { path: 'admin', component:AdminComponent, canActivate: [AuthGuard]},
  { path: 'login', component:LoginComponent, canActivate: [AuthGuard]},
  { path: 'logout', component:LoginComponent},
  { path: 'vendor', component:VendorComponent, canActivate: [AuthGuard]},
  { path: 'vendorlist', component:VendorListComponent, canActivate: [AuthGuard]},
  { path: 'editvendor', component:VendorEditComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
