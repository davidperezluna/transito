import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
    selector: 'app-jvectormap-page',
    templateUrl: './jvectormap.component.html'
})

export class JvectormapComponent implements OnInit {

  ngOnInit() {
     /* jvectormap tables*/

   const gdpData = {
              'AF': 16.63,
              'AL': 11.58,
              'AU': 158.97,
              'IN': 100.97,
            };

             $('#mapwrap2').vectorMap({
                  map: 'world_mill_en',
                  series: {
                    regions: [{
                      values: gdpData,
                      scale: ['#b7c8ff', '#7a99ff'],
                      normalizeFunction: 'polynomial'
                    }]
                  },
                  onRegionTipShow: function(e, el, code){
                    el.html(el.html() + ' (GDP - ' + gdpData[code] + ')');
                  }
             });

              $('#mapwrap').vectorMap({map: 'world_mill_en'});


              $('#mapasiawrap').vectorMap({
                  map: 'us_lcc_en', regionStyle: {
                      initial: { fill: '#7a99ff'}
                  }
              });
              $('#mapafricawrap').vectorMap({
                  map: 'us_merc_en', gionStyle: {
                      initial: {fill: '#ff6262'}
                  }
              });
              $('#mapusawrap').vectorMap({map: 'us_aea_en'});
              $('#mapindiawrap').vectorMap({map: 'us_mill_en'});
      /* jvectormap tables*/


  }
}
