import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
declare var $: any;
declare var eventData: any;
/**
*  This class represents the lazy loaded HomeComponent.
*/

@Component({
  selector: 'app-home-cmp',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Grafica de tipo de correspondencia',
    },
    legend: {
      display: false,
      labels: { fontColor: '#b7c8ff' }
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
  public barChartLabels: string[] = ['TU', 'DP', 'SI', 'I', 'RSTTD'];
  public barChartType: any = 'bar';
  public barChartLegend: any = true;
  public barChartData: any[] = [
    { data: [65, 80, 81, 56, 20], label: 'Cantidad' },
  ];

  ngOnInit() {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      editable: true,
      selectable: true,
      selectHelper: true,
      select: function (start, end) {

        const title = prompt('Event Title:');

        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');

      },
      events: [
        {
          title: 'Automatica',
          start: '2019-10-01',
          color: '#2cc4cd'
        },
        {
          id: 999,
          title: 'Manual',
          start: '2019-10-09T16:00:00',
          color: '#2cc4cd'
        },
        {
          id: 999,
          title: 'Manual',
          start: '2019-12-16T16:00:00',
          color: '#ff6262'
        },
        {
          title: 'Automatica',
          start: '2019-10-12T10:30:00',
          end: '2019-10-12T12:30:00',
          color: '#2cc4cd'
        },
        {
          title: 'Manual',
          start: '2019-10-12T12:00:00',
          color: '#ffb100'
        },
        {
          title: 'Automatica',
          start: '2019-10-12T14:30:00',
          color: '#6c8bef'
        },
        {
          title: 'Automatica',
          start: '2019-10-12T17:30:00',
          color: '#6c8bef'
        },
        {
          title: 'Manual',
          start: '2019-11-12T20:00:00',
          color: '#ffb100'
        },
        {
          title: 'Manual',
          start: '2019-01-13T07:00:00',
          color: '#ffb100'
        },
        {
          title: 'Automatica',
          url: 'http://google.com/',
          start: '2019-10-28',
          color: '#2cc4cd'
        },

        // red areas where no events can be dropped
        {
          start: '2019-12-17',
          end: '2019-12-20',
          overlap: false,
          rendering: 'background',
          color: '#ff6262'
        },
        {
          start: '2019-12-14',
          end: '2019-12-16',
          overlap: false,
          rendering: 'background',
          color: '#ff6262'
        }

      ],
      droppable: true,
      // this allows things to be dropped onto the calendar
      drop: function () {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove, #drop-remove2').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }
      }
    });
    
    swal.close();
  }
}
