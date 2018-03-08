import { Component, OnInit } from '@angular/core';
declare var $: any;
/**
*  This class represents the lazy loaded HomeComponent.
*/



@Component({
  selector: 'app-entertainment-cmp',
  templateUrl: 'entertainment.component.html'
})

export class EntertainmentComponent implements OnInit {

  ngOnInit() {

    /* Sparklines can also take their values from the first argument   passed to the sparkline() function */
    const myvalues = [10, 8, 5, 7, 4, 2, 8, 10, 8, 5, 6, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4];
    $('.dynamicsparkline').sparkline(myvalues, {
      type: 'bar', width: '100px', height: '20', barColor: '#cccccc', barWidth: '2', barSpacing: 2}
    );


    /* Card fullscreeen button script */
    $('.fullscreen-btn').on('click', function(){
        $(this).closest('.full-screen-container').toggleClass('fullscreen');
        $('body').toggleClass('fullscreen');
    });
    /* Card fullscreeen button script ends */


    /* Flexslider */
    $('.flexslider').flexslider({
        animation: 'slide',
        animationLoop: false,
        itemWidth: 240,
        itemMargin: 26,
        controlNav: false
    });
    /* Flexslider */


  }

}
