import { Component, OnInit } from '@angular/core';
import { CvAcuerdoPagoService } from '../../services/cvAcuerdoPago.service';
import { LoginService } from '../../services/login.service';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { ComparendoService } from '../../services/comparendo.service';
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
  public sedeOperativa: any = null;


  constructor(
    private _loginService: LoginService,
    private _FuncionarioService: MpersonalFuncionarioService,
    private _ComparendoService: ComparendoService,
  ){}
    
  ngOnInit() {  }

  onSearch() {
    this.formIndex = false;

    let token = this._loginService.getToken();

    this._ComparendoService.searchByInfractor({ 'infractorIdentificacion': this.numeroIdentificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.comparendos = response.data;
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
          this.formIndex = true;
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'info',
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
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

  onSelect(comparendo: any, eve: any) {
    if (eve.target.checked) {
      this.comparendosSelect.push(comparendo.id);
      this.valorTotal = this.valorTotal + comparendo.valor;
    } else {
      let index = this.comparendosSelect.indexOf(comparendo.id);
      this.valorTotal = this.valorTotal - comparendo.valor;
      if (index > -1) {
        this.comparendosSelect.splice(index, 1);
      }
    }
  }

  /*onSelectCurso(comparendo: any, eve: any) {
    if (eve.target.checked) {
      this.comparendosSelect.push(comparendo.id);
      this.valorTotal = this.valorTotal + comparendo.valor;
    } else {
      let index = this.comparendosSelect.indexOf(comparendo.id);
      this.valorTotal = this.valorTotal - comparendo.valor;
      if (index > -1) {
        this.comparendosSelect.splice(index, 1);
      }
    }
  }*/


  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
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
   this.table = $('#dataTables-example').DataTable();
  }

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
    this.table.destroy();
  }
  
 
    /*let identity = this._loginService.getIdentity();
    let token = this._loginService.getToken();
      
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