import { Component } from '@angular/core';
import { Router,RouterEvent,NavigationStart,RoutesRecognized  } from '@angular/router';
// import { filter } from 'd3';
import { pairwise , filter } from 'rxjs/operators';
import { MetaService } from '@core/services';



const addPath = (urlAndQuery: string[]) => urlAndQuery[0] ? '/' + urlAndQuery[0] : '';
const addQuery = (urlAndQuery: string[]) => urlAndQuery[1] ? '?' + urlAndQuery[1] : '';
const DEFAULT_TENANT = 'uk'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    private activeTenant: string;
    constructor(private router: Router , private metaService : MetaService) {

         
    //     const tenants = ['munich', 'berlin'];
    // const defaultTenant = 'default';
    }

    ngOnInit(){
      // console.log( , "path name....")
      if(location.pathname.includes('/germany/')){
        this.metaService.setMeta({"currency" : "€" , "is_per_unit_in_promo" : false , "tenant" : 'germany'})

      }
      else if(location.pathname.includes('/uk/')){
        this.metaService.setMeta({"currency" : "£" , "is_per_unit_in_promo" : false, "tenant" : 'uk'})
      }

        const tenants = ['uk', 'germany'];
        const defaultTenant = 'germany';
        

        this.router.events.pipe(
            filter((e:any)=> e instanceof NavigationStart)
        ).subscribe((event: NavigationStart) => {

          // console.log(event.url , "EVENT URL")
          const ev_url =event.url !
          if( !(ev_url == "/country-page") && !(ev_url == "/")){
            const url = event.url === '/' ? '' : event.url;
            const urlAndQuery = url.split('?');
            const pathMap = urlAndQuery[0].split('/');
            // first element is an empty string, second element of the path segments is the tenant
            const firstPathPart = pathMap[1];
    
            // a known tenant is in the url path (in case of a direct page load)
            if (tenants.includes(firstPathPart) || firstPathPart === defaultTenant) {
    
              // if tenant has changed, store it
              if (firstPathPart !== this.activeTenant) {
                this.activeTenant = firstPathPart;
              }
    
            } else {
               
              let prefix;
              if (this.activeTenant) {
                prefix = this.activeTenant;
              } else {
                prefix = DEFAULT_TENANT;
              }
    
              // finally build url of tenant prefix, path and query params 
              // debugger;
              
              const redirectUrl =  prefix + addPath(urlAndQuery) + addQuery(urlAndQuery);
              // console.log(redirectUrl.replace("//" , "/") , "redirect url....")
              // debugger
              this.router.navigate([redirectUrl.replace("//" , "/")]);
            } 
          

          }

      
            
          
      });
        
    }
}
