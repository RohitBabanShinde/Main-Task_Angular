import { UserClass } from './Shared/Info-user';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

 const Url = ' http://localhost:3000';
 const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type':  'application/json',

   })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
   public edit: any[];
   constructor(private http: HttpClient) { }
   userAdd (user): Observable<UserClass> {

     return  this.http.post<UserClass>(`${Url}/user/`, user, httpOptions).pipe(
       retry(1),
       catchError(this.handleError)
     );
   }

   getUser(id): Observable<UserClass> {
    console.log(`${Url}/user?id=` + id);

    return  this.http.get<UserClass>(`${Url}/user?id=` + id, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
   }

   userUpdate(user, id): Observable<UserClass> {
     console.log(`${Url}/user?id=` + id);

     return  this.http.put<UserClass>(`${Url}/user?id=` + id, user,httpOptions).pipe(
       retry(1),
       catchError(this.handleError)
     );
     }

   handleError(error){
     let errorMessage = '';
     if(error.error instanceof ErrorEvent){
       errorMessage = error.error.message;
     }else{
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage)
   }
}
