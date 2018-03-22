"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
*  This class represents the lazy loaded HomeComponent.
*/
var TimelineComponent = /** @class */ (function () {
    function TimelineComponent() {
    }
    TimelineComponent = __decorate([
        core_1.Component({
            selector: 'app-timeline-cmp',
            templateUrl: 'timeline.html'
        })
    ], TimelineComponent);
    return TimelineComponent;
}());
exports.TimelineComponent = TimelineComponent;
var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
    }
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-cmp',
            templateUrl: 'chat.html'
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent() {
    }
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'app-notifications-cmp',
            templateUrl: 'notifications.html'
        })
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
var LineChartComponent = /** @class */ (function () {
    function LineChartComponent() {
        // lineChart
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            responsive: true,
            title: {
                display: false,
                text: 'Chart.js Combo Bar Line Chart',
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
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(111, 154, 224, 0.54)',
                borderColor: 'rgb(91, 141, 222)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(55, 116, 216, 0.63)',
                borderColor: 'rgb(43, 121, 248)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(49, 73, 255, 0.2)',
                borderColor: 'rgb(41, 122, 255)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    LineChartComponent = __decorate([
        core_1.Component({
            selector: 'app-line-chart',
            templateUrl: 'linechart.html'
        })
    ], LineChartComponent);
    return LineChartComponent;
}());
exports.LineChartComponent = LineChartComponent;
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
        /* Sparklines can also take their values from the first argument   passed to the sparkline() function */
        var myvalues = [10, 8, 5, 7, 4, 2, 8, 10, 8, 5, 6, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4];
        $('.dynamicsparkline').sparkline(myvalues, {
            type: 'bar', width: '100px', height: '20', barColor: '#cccccc', barWidth: '2', barSpacing: 2
        });
        /* jvectormap tables*/
        $('#mapwrap').vectorMap({
            map: 'world_mill_en',
            regionStyle: {
                initial: { fill: '#7a99ff' }
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
        $('.fullscreen-btn').on('click', function () {
            $(this).closest('.full-screen-container').toggleClass('fullscreen');
            $('body').toggleClass('fullscreen');
        });
        /* Card fullscreeen button script ends */
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home-cmp',
            templateUrl: 'home.component.html'
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map