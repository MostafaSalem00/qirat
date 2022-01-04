import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private router: Router, private toastr: ToastrService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if(error){
                    console.log(error);
                    if(error.status === 400){
                        if(error.error.errors){
                            this.toastr.error(error.error.message, error.error.statusCode);
                        }
                        else{
                            this.toastr.error(error.error.message, error.error.statusCode);
                        }
                    }

                    if(error.status === 401){
                        this.toastr.error(error.error.message, error.statusCode);
                    }

                    if(error.status === 405){
                        this.toastr.error(error.error.message, error.statusCode);
                    }

                    if(error.status === 404){

                    }
                    if(error.status === 500){
                        
                    }
                    
                }
                return throwError(error);
            })
        );
    }

}