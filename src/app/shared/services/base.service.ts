import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environments} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  protected httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  protected http: HttpClient = inject(HttpClient);

  protected basePath: string = `${environments.serverBasePath}`;

  protected resourceEndPoint: string = '/resources';

  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndPoint}`;
  }

  public create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions);
  }

  public update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions);
  }

  public getAll(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.resourcePath(), this.httpOptions);
  }
}
