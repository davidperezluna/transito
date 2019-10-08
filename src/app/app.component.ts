import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private url = environment.apiUrl;
  public isTokenAvaialable:any;
  private _http: Http;
  private _router: Router

  ngOnInit() {
    /* Resposnsive Utility hide menu */
    if ($(window).width() >= 1440 && $('body').hasClass('no-menu-show') !== true) {
        if ( $('body').hasClass('left-menu-only') === true ) {
          $('body').removeClass('menuclose');
        }else if ( $('body').hasClass('horizontal-menu') === true ) {
          $('body').addClass('menuclose-right');
        }else {
          $('body').removeClass('menuclose ');
        }
    }else {
      if ( $('body').hasClass('left-menu-only') === true ) {
            $('body').addClass('menuclose');
      }else {
          $('body').addClass('menuclose ');
      }
    }


  /* Card fullscreeen button script */
    $('.fullscreen-btn').on('click', function(){
        $(this).closest('.full-screen-container').toggleClass('fullscreen');
        $('body').toggleClass('fullscreen');
    });

    $(window).on('resize', function(){
      if (
        $(window).width() >= 1440 && $('body').hasClass('no-menu-show') !== true) {
          $('body').removeClass('menuclose ');
      }else {
          $('body').addClass('menuclose menuclose-right');
      }
    });

    /*let token = localStorage.getItem("token");

    if (token) {
      this.isTokenAvaialable = true;

      this._http.get(this.url + + 'your mthod to validate token' + token).subscribe(response => {
        if (response) {
          if (window.location.pathname == "") {
            this._router.navigate(['/login', { outlets: { 'r2': ['dashboard'] } }]);
          }
        } else if (!response) {

          this.logout('Server restarted.Please login again!!');
        } else {

          this.logout('Session expired.Please login again.!!');
        }

      }, (err: HttpErrorResponse) => {
        //this.toastr.warning('Server restarted.Please login again!!', 'Alert');
        localStorage.removeItem("token");
        this.isTokenAvaialable = false;
        this.logout('Server restarted.Please login again!!');
      });
    } else {
      this.isTokenAvaialable = false;
      this._router.navigate(['']);
      localStorage.removeItem("token");
      this.isTokenAvaialable = false;
    }*/
  }
}
