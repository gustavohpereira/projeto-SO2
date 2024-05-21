import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackEndConnectionService {

  constructor(private http:HttpClient) { }

  loginConnection(data:{username:string, password:string}){
    return this.http.post('http://18.215.169.99:3000/user/login', data);
  }


}
