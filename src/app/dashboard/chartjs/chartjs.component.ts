import { Component } from '@angular/core';

@Component({
    selector: 'app-chartjs-page',
    templateUrl: './chartjs.component.html'
})

export class ChartjsComponent {

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



    // bar chart
    public barChartOptions: any = {
      scaleShowVerticalLines: false,
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
    public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: any = 'bar';
    public barChartLegend: any = true;
    public barChartData: any[] = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

   // PolarArea
   public polarAreaChartOptions: any = {
      responsive: true,
        };
    public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: any = true;

    public polarAreaChartType: any = 'polarArea';


    // Radar
   public radarChartOptions: any = {
      responsive: true,
      borderColor: '#ffffff'
    };
    public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
    public radarChartData: any = [
      {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];
    public radarChartType: any = 'radar';


}
