import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetDef } from './asset-def';

@Injectable({
  providedIn: 'root'
})
export class AssetDefService {

  private baseUrl= 'http://localhost:62586/api';

  constructor(private http: HttpClient) { }

  getAssetList(): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDef');
  }

  getAssets(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType/'+id);
  }

  getAsset(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDef/'+id);
  }

  deleteAsset(id: number): Observable<any>{
    return this.http.delete(this.baseUrl+'/AssetDef/'+id);
  }

  addAsset(asset: AssetDef){
    return this.http.post(this.baseUrl+'/AssetDef',asset);
  }
  
  getAsset_def(name: string): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDef?na='+name);
  }

  putAsset_def(id:number, asset: AssetDef): Observable<any>{
    return this.http.put(this.baseUrl+'/AssetDef/'+ id, asset);
  }

  getAssetType(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDef/'+id);
  }

  getAssetTypes(): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType');
  }
  

}
