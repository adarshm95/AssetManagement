import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl= 'http://localhost:62586/api';

  constructor(private http: HttpClient) { }

  getVendorList(): Observable<any>{
    return this.http.get(this.baseUrl+'/Vendor');
  }

  getVendors(na: string): Observable<any>{
    return this.http.get(this.baseUrl+'/Vendor?na='+na);
  }

  getVendor(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/Vendor/'+id);
  }

  deleteVendor(id: number): Observable<any>{
    return this.http.delete(this.baseUrl+'/Vendor/'+id);
  }

  addVendor(vendor: Vendor){
    return this.http.post(this.baseUrl+'/Vendor',vendor);
  }
  
  getVendorDet(name: string): Observable<any>{
    return this.http.get(this.baseUrl+'/Vendor?na='+name);
  }

  getATypeVendor(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDef/'+id);
  }


  putVendor(id:number, vendor: Vendor): Observable<any>{
    return this.http.put(this.baseUrl+'/Vendor/'+ id, vendor);
  }

  getAssetType(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType/'+id);
  }

  getAssetTypes(): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType');
  }
  

}
