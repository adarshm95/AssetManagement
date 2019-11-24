import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetDef } from './asset-def';

@Injectable({
  providedIn: 'root'
})
export class AssetDefService {

  private baseUrl= 'http://localhost:51575/api';

  constructor(private http: HttpClient) { }

  getAssetList(): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDefinition');
  }

  getAsset(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDefinition/'+id);
  }

  deleteAsset(id: number): Observable<any>{
    return this.http.delete(this.baseUrl+'/AssetDefinition/'+id);
  }

  addAsset(asset: AssetDef){
    return this.http.post(this.baseUrl+'/AssetDefinition',asset);
  }
  
  getAsset_def(name: string): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetDefinition?na='+name);
  }

  putAsset_def(id:number, asset: AssetDef): Observable<any>{
    return this.http.put(this.baseUrl+'/AssetDefinition/'+ id, asset);
  }

  getAssetType(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType/'+id);
  }

  getAssetTypes(): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetType');
  }
  

}
