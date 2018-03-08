import { Component, OnInit } from '@angular/core';
declare var $: any;
/**
*  This class represents the lazy loaded HomeComponent.
*/


@Component({
  selector: 'app-home-cmp',
  templateUrl: 'social.component.html'
})

export class SocialComponent implements OnInit {

  ngOnInit() {

    /* Sparklines can also take their values from the first argument   passed to the sparkline() function */
    const myvalues = [10, 8, 5, 7, 4, 2, 8, 10, 8, 5, 6, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4];
    $('.dynamicsparkline').sparkline(myvalues, {
      type: 'bar', width: '100px', height: '20', barColor: '#cccccc', barWidth: '2', barSpacing: 2}
    );


    /* jvectormap tables*/
    $('#mapwrap').vectorMap({
        map: 'world_mill_en',
        regionStyle: {
                initial: {fill: '#7a99ff'}
        }
    });
    /* jvectormap tables*/


    /* data tables*/
    $('#dataTables-example').DataTable({
        responsive: true,
        pageLength: 5,
        sPaginationType: 'full_numbers',
        oLanguage: {
            oPaginate: {
                sFirst: '<<',
                sPrevious: '<',
                sNext: '>',
                sLast: '>>'
            }
        }
     });
    /* data tables*/


    /* Card fullscreeen button script */
    $('.fullscreen-btn').on('click', function(){
        $(this).closest('.full-screen-container').toggleClass('fullscreen');
        $('body').toggleClass('fullscreen');
    });
    /* Card fullscreeen button script ends */
   }
}
