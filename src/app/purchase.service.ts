import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrder } from './purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl= 'http://localhost:62586/api';

  constructor(private http: HttpClient) { }

  getAssettypes(na: string): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType?na='+na);
  }

  getAllAssettypes(): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType');
  }

  getVendors(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/Purchase/'+ id);
  }

  getAsset(na: string): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDef?na='+na);
  }

  postPurchase(po: PurchaseOrder){
    return this.http.post(this.baseUrl+'/Purchase',po);
  }

  getPurchaseList(): Observable<any>{
    return this.http.get(this.baseUrl+'/Purchase');
  }

  getPurchase(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/PurchaseEdit/'+ id);
  }

  updatePurchase(id:number, purchase: PurchaseOrder): Observable<any>{
    return this.http.put(this.baseUrl+'/PurchaseEdit/'+ id, purchase);
  }

  cancelPurchase(id: number): Observable<any>{
    return this.http.delete(this.baseUrl+'/Purchase/'+ id);
  }

}
