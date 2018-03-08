import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var eventData: any;

@Component({
    selector: 'app-calendar-page',
    templateUrl: './calendar.component.html'
})

export class CalendarComponent implements OnInit {
  ngOnInit() {
/* initialize the calendar
    -----------------------------------------------------------------*/
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      editable: true,
            selectable: true,
      selectHelper: true,
            select: function(start, end) {

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
          title: 'All Day Event',
          start: '2017-11-01',
                    color: '#2cc4cd'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-11-09T16:00:00',
                    color: '#2cc4cd'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-12-16T16:00:00',
                    color: '#ff6262'
        },
        {
          title: 'Meeting',
          start: '2017-11-12T10:30:00',
          end: '2017-11-12T12:30:00',
                    color: '#2cc4cd'
        },
        {
          title: 'Lunch',
          start: '2017-11-12T12:00:00',
                    color: '#ffb100'
        },
        {
          title: 'Meeting',
          start: '2017-11-12T14:30:00',
                    color: '#6c8bef'
        },
        {
          title: 'Happy Hour',
          start: '2017-11-12T17:30:00',
                    color: '#6c8bef'
        },
        {
          title: 'Dinner',
          start: '2018-01-12T20:00:00',
                    color: '#ffb100'
        },
        {
          title: 'Birthday Party',
          start: '2018-01-13T07:00:00',
                    color: '#ffb100'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2017-04-28',
                    color: '#2cc4cd'
        },

        // red areas where no events can be dropped
        {
          start: '2017-12-17',
          end: '2017-12-20',
          overlap: false,
          rendering: 'background',
          color: '#ff6262'
        },
        {
          start: '2017-12-14',
          end: '2017-12-16',
          overlap: false,
          rendering: 'background',
          color: '#ff6262'
        }

      ],
      droppable: true,
            // this allows things to be dropped onto the calendar
      drop: function() {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove, #drop-remove2').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }
      }
    });

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
