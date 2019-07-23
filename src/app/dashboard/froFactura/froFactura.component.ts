import { Component, OnInit } from '@angular/core';
import { FroFacturaService } from '../../services/froFactura.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froFactura.component.html'
})

export class FroFacturaComponent implements OnInit {
  public errorMessage;
	public acuerdoPago: any;
	public valorTotal: any;
	public ciudadano: any;
	public comparendos: any = null;
  public comparendosSelect: any = [];
	public numeroIdentificacion: any;
  
  public formIndex = false;
  public formNew = false;
  public formEdit = false;
  public formSearch = true;
  public table: any = null;
  public organismosTransito: any = null;
  public organismoTransito: any = null;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '2', 'label': 'Identificación' },
    { 'value': '4', 'label': 'No. de comparendo' },
  ];


  constructor(
    private _LoginService: LoginService,
    private _FacturaService: FroFacturaService,
  ){}
    
  ngOnInit() {  }

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

    this._FacturaService.searchByFilters(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.comparendos = response.data;
          this.formIndex = true;

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
    $('#dataTables-example').DataTable({
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
   this.table = $('#dataTables-example').DataTable();
  }

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
    this.table.destroy();
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

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = false;
      this.formSearch = true;
      this.ngOnInit();
    }
  }

  onEdit(acuerdoPago:any){
    this.acuerdoPago = acuerdoPago;
    this.formEdit = true;
    this.formIndex = false;
  }
}