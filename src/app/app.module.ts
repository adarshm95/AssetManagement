import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetDefComponent } from './asset-def/asset-def.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { AdminComponent } from './admin/admin.component';
import { PurchaseManagerComponent } from './purchase-manager/purchase-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { VendorComponent } from './vendor/vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { VendorThemeComponent } from './vendor-theme/vendor-theme.component';
import { AdminThemeComponent } from './admin-theme/admin-theme.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { AssetMasterComponent } from './asset-master/asset-master.component';
import { AssetMasterListComponent } from './asset-master-list/asset-master-list.component';
import { PurchaseEditComponent } from './purchase-edit/purchase-edit.component';
import { MasterOrderListComponent } from './master-order-list/master-order-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AssetDefComponent,
    AssetListComponent,
    AssetEditComponent,
    AdminComponent,
    PurchaseManagerComponent,
    LoginComponent,
    VendorComponent,
    VendorListComponent,
    VendorEditComponent,
    VendorThemeComponent,
    AdminThemeComponent,
    PurchaseListComponent,
    AssetMasterComponent,
    AssetMasterListComponent,
    PurchaseEditComponent,
    MasterOrderListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSliderModule,
    MatSelectModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'     
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
