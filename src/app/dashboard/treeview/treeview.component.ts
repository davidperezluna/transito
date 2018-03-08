import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-treeview-page',
    templateUrl: './treeview.component.html'
})

export class TreeviewComponent implements OnInit {
   ngOnInit() {
    $('#html1').jstree({'plugins': ['wholerow', 'checkbox']});
        // inline data demo
  $('#data').jstree({
    'core' : {
      'data' : [
        { 'text' : 'Root node', 'children' : [
            { 'text' : 'Child node 1' },
            { 'text' : 'Child node 2' }
        ]}
      ]
    }
  });

  // data format demo
  $('#frmt').jstree({
    'core' : {
      'data' : [
        {
          'text' : 'Root node',
          'state' : { 'opened' : true },
          'children' : [
            {
              'text' : 'Child node 1',
              'state' : { 'selected' : true },
              'icon' : 'jstree-file'
            },
            { 'text' : 'Child node 2', 'state' : { 'disabled' : true } }
          ]
        }
      ]
    }
  });

  // ajax demo
  $('#ajax').jstree({
    'core' : {
      'data' : [{ 'id' : 'ajson1', 'parent' : '#', 'text' : 'Simple root node' },
 { 'id' : 'ajson2', 'parent' : '#', 'text' : 'Root node 2' },
 { 'id' : 'ajson3', 'parent' : 'ajson2', 'text' : 'Child 1' },
 { 'id' : 'ajson4', 'parent' : 'ajson2', 'text' : 'Child 2' }]
    }
  });
  }
}
