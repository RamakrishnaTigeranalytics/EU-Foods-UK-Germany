import { ErrorHandler, Inject,Injector,Injectable} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "@core/services"
import { Router,NavigationEnd } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector , private authService: AuthService,private router: Router) {
    //   super(true);
   }
   private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }
  handleError(error) {
    // console.log(error , "handleerror")
      if(error.status_code == 401){
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        this.authService.isLoggedInObservable.next(false);
        this.authService.setUser(null as any)
        this.router.navigate(['/login'])

      }
      else{
        // debugger
        console.log(error , "error in global handler")
        if('detail' in error){
          this.toastrService.error(error['detail'])

        }
        else{
          this.toastrService.error(error)

        }
       
   

      }
      
     
    
     throw error;
  }
  
}