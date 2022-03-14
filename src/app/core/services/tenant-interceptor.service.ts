import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable()
export class TenantInterceptorService implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
       
       
       if (req.url) {

         // debugger
         let pathname = location.pathname
         const tenant = "/" + pathname.split("/")[1] 
         const original = req.url
         const user_index = original.indexOf('user')
         if(user_index == -1){
            const api_index = original.indexOf('/api/')
            const org = req.url.split("")
            org.splice(api_index, 0, tenant);
            const new_url =org.join('');
            console.log(new_url , "new url..")
            return next.handle(req.clone({ url: new_url }));

         }
        
      //   const duplicate = req.clone({ url: tenant });
        
      //   return next.handle(duplicate);
      }
      return next.handle(req);
    }
   
}