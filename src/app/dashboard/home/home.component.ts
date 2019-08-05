import { Component, OnInit } from '@angular/core';
declare var $: any;
/**
*  This class represents the lazy loaded HomeComponent.
*/

@Component({
  selector: 'app-timeline-cmp',
  templateUrl: 'timeline.html'
})
export class TimelineComponent { }

@Component({
  selector: 'app-chat-cmp',
  templateUrl: 'chat.html'
})
export class ChatComponent { }

@Component({
  selector: 'app-notifications-cmp',
  templateUrl: 'notifications.html'
})
export class NotificationComponent { }

@Component({
  selector: 'app-line-chart',
  templateUrl: 'linechart.html'
})

export class LineChartComponent {
  // lineChart
  public lineChartData: any = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true,

    title: {
      display: false,
      text: 'Chart.js Combo Bar Line Chart',
    },
    legend: {
      display: false,
      labels: { fontColor: '#b7c8ff'}
      },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#b7c8ff',
        },
        gridLines: {
          color: 'rgba(160,160,160,0.2)',
          zeroLineColor: 'rgba(160,160,160,0.1)'
          }
        }],
      xAxes: [{
        ticks: {
          fontColor: '#b7c8ff'
        },
        gridLines: {
          color: 'rgba(160,160,160,0.2)',
          zeroLineColor: 'rgba(160,160,160,0.1)'
          }
        }]
      }

  };
  public lineChartColors: any = [
    { // grey
      backgroundColor: 'rgba(111, 154, 224, 0.54)',
      borderColor: 'rgb(91, 141, 222)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(55, 116, 216, 0.63)',
      borderColor: 'rgb(43, 121, 248)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(49, 73, 255, 0.2)',
      borderColor: 'rgb(41, 122, 255)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: any = true;
  public lineChartType: any = 'line';

}

@Component({
  selector: 'app-home-cmp',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

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
