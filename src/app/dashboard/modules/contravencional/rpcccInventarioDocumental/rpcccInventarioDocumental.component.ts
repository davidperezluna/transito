import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from '../../../../services/login.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CvCdoCfgEstadoService } from '../../../../services/cvCdoCfgEstado.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { DatePipe, CurrencyPipe } from '@angular/common';

import swal from 'sweetalert2';
import { Utils } from 'ng2-bootstrap';
declare var $: any;

@Component({
  selector: 'rpcccInventarioDocumental',
  templateUrl: './rpcccInventarioDocumental.component.html',
  providers: [DatePipe]
})
export class RpcccInventarioDocumentalComponent implements OnInit {
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
  public comparendosCobroCoactivo=[];
  public comparendosAcuerdoPago=[];
  public comparendosAcuerdoPagoIncumplido=[];
  public comparendosInhibitorio=[];
  public comparendosCaducidad=[];
  public comparendosPagado=[];
  public comparendosPreinscripcion=[];
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
    private _PnalFuncionarioService: PnalFuncionarioService,
    private _CvCdoCfgEstadoService: CvCdoCfgEstadoService,
    private _ComparendoService: CvCdoComparendoService,
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

    this._PnalFuncionarioService.selectAgentes().subscribe(
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

    this._CvCdoCfgEstadoService.select().subscribe(
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
    if(estado) {
        $('#'+ estado).DataTable({
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
      this.table = $('#'+ estado).DataTable();
    }
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
                if (this.comparendosPendiente.length != 0) {
                  let estado = "dataTables-pendiente";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              } 
              else if(element.estado.id == 2){
                this.comparendosSancionado.push(element);
                if (this.comparendosSancionado.length != 0) {
                  let estado = "dataTables-sancionado";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 3){
                this.comparendosCobroCoactivo.push(element);
                if (this.comparendosCobroCoactivo.length != 0) {
                  let estado = "dataTables-cobroCoactivo";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 4){
                this.comparendosAcuerdoPago.push(element);
                if(this.comparendosAcuerdoPago.length != 0){
                  let estado = "dataTables-acuerdoPago";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 5){
                this.comparendosAcuerdoPagoIncumplido.push(element);
                if (this.comparendosAcuerdoPagoIncumplido.length != 0) {
                  let estado = "dataTables-acuerdoPagoIncumplido";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 6){
                this.comparendosInhibitorio.push(element);
                if (this.comparendosInhibitorio.length != 0) {
                  let estado = "dataTables-inhibitorio";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 7){
                this.comparendosCaducidad.push(element);
                if (this.comparendosCaducidad.length != 0) {
                  let estado = "dataTables-caducidad";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 8){
                this.comparendosPagado.push(element);
                if (this.comparendosPagado.length != 0) {
                  let estado = "dataTables-pagado";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 9){
                this.comparendosPreinscripcion.push(element);
                if (this.comparendosPreinscripcion.length != 0) {
                  let estado = "dataTables-preinscripcion";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 10){
                this.comparendosExonerado.push(element);
                if (this.comparendosExonerado.length != 0) {
                  let estado = "dataTables-exonerado";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              else if(element.estado.id == 11){
                this.comparendosRevocatoria.push(element);
                if (this.comparendosRevocatoria.length != 0) {
                  let estado = "dataTables-revocatoria";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
              }
              /* else if(element.estado.id == 10){
                this.comparendosInterposicion.push(element);
              } */
              else if(element.estado.id == 12){
                this.comparendosNulidad.push(element);
                if (this.comparendosNulidad.length != 0) {
                  let estado = "dataTables-nulidad";
                  let timeoutId = setTimeout(() => {
                    this.iniciarTabla(estado);
                  }, 100);
                }
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