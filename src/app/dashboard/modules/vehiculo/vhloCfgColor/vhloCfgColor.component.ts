import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {VhloCfgColorService} from '../../../../services/vhloCfgColor.service';
import { Http, Headers } from "@angular/http";
import {LoginService} from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloCfgColor.component.html'
})

export class VhloCfgColorComponent implements OnInit {
  public errorMessage;
  
	public id;
	public colores;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public color:any; 
  public dtOptions:any; 
  public http: any = Http;

  constructor(
		private _ColorService: VhloCfgColorService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let timeoutId = setTimeout(() => {
      this.onInitTable();
    }, 100);

    

		/*this._ColorService.index().subscribe(
      response => {
        this.colors = response.data;
        let timeoutId = setTimeout(() => {
          this.onInitTable();
        }, 100);
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );*/
  }
  
  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 10,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      },
      paging: true,
      serverSide: true,
      processing: true,
      ajax: () => {
        this._ColorService.index().subscribe(
          response => {
            this.colores = response.data;
          }
        );

        /*this.http
          .get(
            'http://myapi.com',
            {
              params: params,
              headers: new Headers().set(
                'token',
                localStorage.getItem('token')
              )
            }
          )
          .subscribe(resp => {

            this.result = resp['data'];

            callback({
              recordsTotal: resp['length'],
              recordsFiltered: resp['length'],
              data: []
            });
          });*/
      }
    });


    /*$('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();*/
  }
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }

  deleteColor(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._ColorService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    });
                  this.ngOnInit();
              }, 
            error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

        
      }
    })
  }

  editColor(color:any){
    this.color = color;
    this.formEdit = true;
    this.formIndex = false;
  }

}