import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
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


  }
}
