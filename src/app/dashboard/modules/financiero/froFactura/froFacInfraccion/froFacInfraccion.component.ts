import { Component, OnInit } from '@angular/core';
import { FroFacInfraccion } from './froFacInfraccion.modelo';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { FroFacturaService } from '../../../../../services/froFactura.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froFacInfraccion.component.html'
})

export class FroFacInfraccionComponent implements OnInit {
  public errorMessage;
  
  public factura: FroFacInfraccion;
	public valorTotal: any = 0;
	public comparendos: any = null;
  public comparendosSelect: any = [];
  public infractor: any = null;
  
  public formIndex: any;
  public formNew: any;
  public formSearch: any;
  public table: any = null;

  public funcionario: any = null;
  public municipio: any = null;
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;
  public facturaNumero: any = null;

  public apiUrl = environment.apiUrl;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '2', 'label': 'Identificación' },
    { 'value': '4', 'label': 'No. de comparendo' },
  ];


  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _ComparendoService: CvCdoComparendoService,
    private _FacturaService: FroFacturaService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.onInitForms();

    this.factura = new FroFacInfraccion(0, 0, null, null, null, null, null);
    
    if (this.comparendosSelect.length > 0) {
      this.comparendosSelect.splice(0, this.comparendosSelect.length);
    }

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;
          this.factura.idOrganismoTransito = this.funcionario.organismoTransito.id;

          swal.close();
        } else {
          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar facturación!',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );
  }

  onInitForms(){
    this.formSearch = true;
    this.formIndex = false;
    this.formNew = false;
  }

  onSearch() {
    this.onInitForms();

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByFiltrosForFactura(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.comparendos = response.data.comparendos;
          this.infractor = response.data.infractor;
          this.formIndex = true;

          this.comparendos.forEach((element: any, key: any) => {            
            this._ComparendoService.validateCurso({ 'id':element.id }, token).subscribe(
              response => {
                if (response.code == 200) {
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
            this.onInitTable();
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

  onInitTable(){
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example').DataTable({
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
  }

  onNew() {
    this.onInitForms();

    this.formNew = true;
    this.formSearch = false;

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
        if (response.code == 200) {
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
  }
  
  onCancelar(){
    this.ngOnInit();
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.factura.comparendos = this.comparendosSelect;
    //Tipo de recaudo infracciones
    this.factura.idTipoRecaudo = 2;

    this._FacturaService.register({'factura':this.factura}, token).subscribe(
      response => {
        if (response.code == 200) {
          this.factura = response.data;
          this.municipio = response.data.organismoTransito.municipio;
          this.fechaCreacion = response.data.fechaCreacion;
          this.fechaVencimiento = response.data.fechaVencimiento;

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