import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-rangeslider-page',
    templateUrl: './rangeslider.component.html'
})

export class RangesliderComponent implements OnInit {
  ngOnInit() {
  let $inputRange = $('input[type="range"].minmax');
         $inputRange.rangeslider({
            polyfill: false
          });
        let $element1 = $('input[type="range"].vertical');
        let $output = $('input[type="range"]').next();
        function updateOutput(el, val) {
            el.textContent = val;
        }
        $element1.rangeslider({
                polyfill: false,
                onInit: function() {
                    updateOutput($output[0], this.value);
                }
            }).on('input', function() {
                updateOutput($output[0], this.value);
        });
        let $element2 = $('input[type="range"].handlevalue');
        let $handle;
        $element2.rangeslider({
            polyfill: false,
            onInit: function() {
              $handle = $('.rangeslider__handle', this.$range);
              updateHandle($handle[0], this.value);
            }
        }).on('input', function() {
            updateHandle($handle[0], this.value);
        });

        function updateHandle(el, val) {
          el.textContent = val;
        }
  }
}
