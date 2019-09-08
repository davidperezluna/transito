import { Component, OnInit } from '@angular/core';
import { SvIpatImpresoMunicipio } from './svIpatImpresoMunicipio.modelo';
import { SvIpatImpresoMunicipioService } from '../../../../services/svIpatImpresoMunicipio.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svIpatImpresoMunicipio.component.html'
})

export class SvIpatImpresoMunicipioComponent implements OnInit {
  public errorMessage;

  public apiUrl = environment.apiUrl + 'seguridadvial/svipatimpresomunicipio';

  public municipios: any;
	public cantidadDisponible: any;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any = null;
  public organismoTransito:any = null; 
  public municipio: SvIpatImpresoMunicipio;

  constructor(
    private _ImpresoMunicipioService: SvIpatImpresoMunicipioService,
    private _FuncionarioService: PnalFuncionarioService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.organismoTransito = response.data.organismoTransito;

          this._ImpresoMunicipioService.index({ 'idOrganismoTransito': this.organismoTransito.id }).subscribe(
            response => {
              this.cantidadDisponible = response.data.cantidadDisponible;
              this.municipios = response.data.municipios;

              let timeoutId = setTimeout(() => {
                this.onInitTable();
              }, 100);

              this.formIndex = true;

              swal.close();
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

        } else {
          this.formIndex = false;

          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar esta operación!',
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

  onInitTable(){
    if (this.table) {
      this.table.destroy();
    }

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

  onDelete(id:any){
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
        let token = this._LoginService.getToken();
        
        this._ImpresoMunicipioService.delete({'id':id}, token).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
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

  onEdit(municipio:any){
    this.municipio = municipio;
    this.formEdit = true;
    this.formIndex = false;
  }
}