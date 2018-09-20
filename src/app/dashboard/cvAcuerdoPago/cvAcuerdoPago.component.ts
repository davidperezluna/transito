import { Component, OnInit } from '@angular/core';
import { CvAcuerdoPagoService } from '../../services/cvAcuerdoPago.service';
import { LoginService } from '../../services/login.service';
import { CiudadanoService } from '../../services/ciudadano.service';
import { ComparendoService } from '../../services/comparendo.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvAcuerdoPago.component.html'
})

export class CvAcuerdoPagoComponent implements OnInit {
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


  constructor(
    private _AcuerdoPagoService: CvAcuerdoPagoService,
    private _loginService: LoginService,
    private _CiudadanoService: CiudadanoService,
    private _ComparendoService: ComparendoService,
  ){}
    
  ngOnInit() {  }

  onSearch() {
    this.formIndex = false;

    let token = this._loginService.getToken();

    this._CiudadanoService.searchByIdentificacion(token, { 'numeroIdentificacion': this.numeroIdentificacion }).subscribe(
      response => {
        if (response.status == 'success') {          
          this.ciudadano = response.data;
          this._ComparendoService.searchComparendosCiudadano({ 'ciudadanoId': this.ciudadano.id }, token).subscribe(
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
        } else {
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
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

  onSelect(idComparendo: any, eve: any) {
    if (eve.target.checked) {
      this.comparendosSelect.push(idComparendo);
    } else {
      let index = this.comparendosSelect.indexOf(idComparendo);
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
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
    this.table.destroy();
  }

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