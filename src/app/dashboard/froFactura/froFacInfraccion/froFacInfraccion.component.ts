import { Component, OnInit } from '@angular/core';
import { ComparendoService } from '../../../services/comparendo.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { LoginService } from '../../../services/login.service';
import { FroFacInfraccion } from './froFacInfraccion.modelo';
import swal from 'sweetalert2';
declare var $: any;
import { environment } from 'environments/environment'

@Component({
  selector: 'app-index',
  templateUrl: './froFacInfraccion.component.html'
})

export class FroFacInfraccionComponent implements OnInit {
  public errorMessage;
  public factura: FroFacInfraccion;
	public valorTotal: any;
	public comparendos: any = null;
  public comparendosSelect: any = [];
  public numeroIdentificacion: any;
  public sedesOperativas: any;
  
  public formIndex = false;
  public formNew = false;
  public formSearch = true;
  public table: any = null;
  public sedeOperativa: any = null;
  public municipio: any = null;
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;
  public facturaNumero: any = null;

  public apiUrl = environment.apiUrl + 'financiero';

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '2', 'label': 'Identificación' },
    { 'value': '4', 'label': 'No. de comparendo' },
  ];


  constructor(
    private _ComparendoService: ComparendoService,
    private _FacturaService: FroFacturaService,
    private _SedeOperativaService: SedeOperativaService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() { 
    if (this.comparendosSelect.length > 0) {
      this.comparendosSelect.splice(0, this.comparendosSelect.length);
    }
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.formIndex = false;

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByFiltrosFactura(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.comparendos = response.data;
          this.formIndex = true;

          this.comparendos.forEach((element: any, key: any) => {            
            this._ComparendoService.validateCurso({ 'id':element.id }, token).subscribe(
              response => {
                if (response.status == 'success') {
                  element.curso = true;
                }else{
                  element.curso = false;
                }
              }
            );
          });

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
        } else {
          this.comparendos = null;
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );
  }

  onSelectCurso(comparendo: any, eve: any) {
    if (eve.target.checked) {
      comparendo.curso = true;
    } else {
      comparendo.curso = false;
    }
  }

  onSelectComparendo(comparendo: any, eve: any) {
    if (eve.target.checked) {
      this.comparendosSelect.push(comparendo);
      this.valorTotal = this.valorTotal + comparendo.valorInfraccion;
    } else {
      let index = this.comparendosSelect.indexOf(comparendo.consecutivo.consecutivo);
      this.valorTotal = this.valorTotal - comparendo.valorInfraccion;
      if (index > -1) {
        this.comparendosSelect.splice(index, 1);
      }
    }
  }

  iniciarTabla(){
    if (this.table) {
      this.table.destroy();
    }

    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-forward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-backward"></i>'
        }
      }
   });

   this.table = $('#dataTables-example').DataTable();
  }

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;

    this.factura = new FroFacInfraccion(0, 0, null, null, null, null);

    swal({
      title: 'Calculando valores!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._FacturaService.calculateValue(this.comparendosSelect, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.factura.valor = response.data.totalPagar;
          this.factura.interes = response.data.totalInteres;

          swal.close();
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }
  
 
    /*let identity = this._LoginService.getIdentity();
    let token = this._LoginService.getToken();
      
    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion },token).subscribe(
      response => { 
        if(response.status == 'success'){
          this.sedeOperativa = response.data.sedeOperativa;
          let datos = {

          }
         
        }
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    });*/

  onCancelar(){
    this.formNew = false;
    this.formIndex = false;
    this.formSearch = true;
    this.ngOnInit();
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.factura.comparendos = this.comparendosSelect;
    //Tipo de recaudo infracciones
    this.factura.idTipoRecaudo = 2;

    this._FacturaService.register(this.factura, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.factura.id = response.data.id;
          this.municipio = response.data.sedeOperativa.municipio.nombre;
          this.fechaCreacion = response.data.fechaCreacion;
          this.fechaVencimiento = response.data.fechaVencimiento;
          this.facturaNumero = response.data.numero;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          this.factura.id = null;

          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );
  }
}