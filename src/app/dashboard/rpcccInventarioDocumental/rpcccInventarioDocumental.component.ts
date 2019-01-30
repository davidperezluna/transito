import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { CfgComparendoEstadoService } from '../../services/cfgComparendoEstado.service';
import { ComparendoService } from '../../services/comparendo.service';
import { DatePipe, CurrencyPipe } from '@angular/common';

import swal from 'sweetalert2';
import { Utils } from 'ng2-bootstrap';
declare var $: any;

@Component({
  selector: 'rpcccInventarioDocumental',
  templateUrl: './rpcccInventarioDocumental.component.html',
  providers: [DatePipe]
})
export class rpcccInventarioDocumentalComponent implements OnInit {
  public errorMessage;
	public id;
  public respuesta;
  public table:any;   
  public agentes;
  public tipoComparendos;
  public comparendos;
  public comparendosSelected;
  public agenteSelected;

  public comparendosPendiente=[];
  public comparendosSancionado=[];
  public comparendosCobroCoativo=[];
  public comparendosAcuerdoPago=[];
  public comparendosAcuerdoPagoIncumplido=[];
  public comparendosInhibitorio=[];
  public comparendosCaducidad=[];
  public comparendosPagado=[];
  public comparendosPrescripcion=[];
  public comparendosExonerado=[];
  public comparendosRevocatoria=[];
  //public comparendosInterposicion=[];
  public comparendosNulidad=[];
  public resumen = {};     public datos = {'fechaDesde': null,
                  'fechaHasta': null,
                  'agenteId': null,
                  'comparendosId': null};

  public date: any;
  public fecha: any;

  constructor(
    private _loginService: LoginService,
    private _MpersonalFuncionarioService: MpersonalFuncionarioService,
    private _CfgComparendoEstadoService: CfgComparendoEstadoService,
    private _ComparendoService: ComparendoService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })

    this._MpersonalFuncionarioService.selectAgentes().subscribe(
      response => {
        this.agentes = response;        
    },
    error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
        }
    }
    );

    this._CfgComparendoEstadoService.select().subscribe(
      response=>{
        this.tipoComparendos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
        }
    }
    );
    

  }
  iniciarTabla(estado){
    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
    //if()
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excel',
          text: 'Excel',
          title: 'xls',
          filename: 'Reporte_Documental_Por_Estado' + this.fecha,
        },
        {
          extend: 'pdfHtml5',
          orientation: 'landscape',
          pageSize: 'LEGAL',
          filename: 'Reporte_Documental_Por_EstadoPDF_' + this.fecha,
        }
      ],
      oLanguage: {
           oPaginate: {
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  
  onNew(){
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  buscarComparendos(){
      this.datos.comparendosId = this.comparendosSelected;
      this.datos.agenteId = this.agenteSelected;
      let token = this._loginService.getToken();
      this._ComparendoService.searchByParametros(this.datos, token).subscribe(
        response=>{

          if(response.code == 200){
            this.comparendos = response.data;
            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            }); 

            this.comparendos.forEach(element => {
              if(element.estado.id == 1)
              {
                this.comparendosPendiente.push(element);
              } 
              else if(element.estado.id == 2){
                this.comparendosSancionado.push(element);
              }
              else if(element.estado.id == 3){
                this.comparendosCobroCoativo.push(element);
              }
              else if(element.estado.id == 4){
                this.comparendosAcuerdoPago.push(element);
                if(this.comparendosAcuerdoPago.length != 0){
                  let estado = "acuerdoPago";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 5){
                this.comparendosAcuerdoPagoIncumplido.push(element);
              }
              else if(element.estado.id == 6){
                this.comparendosInhibitorio.push(element);
              }
              else if(element.estado.id == 7){
                this.comparendosCaducidad.push(element);
              }
              else if(element.estado.id == 8){
                this.comparendosPagado.push(element);
              }
              else if(element.estado.id == 9){
                this.comparendosPrescripcion.push(element);
              }
              else if(element.estado.id == 10){
                this.comparendosExonerado.push(element);
              }
              else if(element.estado.id == 11){
                this.comparendosRevocatoria.push(element);
              }
              /* else if(element.estado.id == 10){
                this.comparendosInterposicion.push(element);
              } */
              else if(element.estado.id == 12){
                this.comparendosNulidad.push(element);
              }             
            });            
          }else if(response.code == 400){
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'warning',
              confirmButtonText: 'Aceptar'
            });       
          }
                  
        }
      );
      
      
  }

  generarPDF(){
  }

}