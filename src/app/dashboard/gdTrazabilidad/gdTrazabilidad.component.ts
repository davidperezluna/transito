import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { GdDocumentoService } from '../../services/gdDocumento.service';
import { GdTrazabilidadService } from '../../services/gdTrazabilidad.service';
import { LoginService } from '../../services/login.service';
import { environment } from 'environments/environment'; 
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './gdTrazabilidad.component.html'
})
export class GdTrazabilidadComponent implements OnInit {
  public errorMessage;
	public id;

  public trazabilidades: any = null;
  public trazabilidad:any;

	public formNew = false;
  public formEdit = false;
  public formShow = false;
  public formIndex = true;

  public table:any = null;

  public funcionario: any = null;

  public docsUrl = environment.docsUrl;

  constructor(
    private _FuncionarioService: MpersonalFuncionarioService,
    private _DocumentoService: GdDocumentoService,
    private _TrazabilidadService: GdTrazabilidadService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.formEdit = false;
    this.formIndex = false;
    this.formShow = false;
    this.formNew = false;

    let token = this._loginService.getToken();
    let identity = this._loginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data;
          this._TrazabilidadService.searchByFuncionario({ 'idFuncionario':this.funcionario.id }, token).subscribe(
            response => {
              if (response.status == 'success') {
                this.formIndex = true;
                this.trazabilidades = response.data;
                let timeoutId = setTimeout(() => {
                  this.iniciarTabla();
                }, 100);
                swal({
                  title: 'Perfecto',
                  text: response.message,
                  type: 'success'
                });
              }else {
                this.formIndex = false;
                swal({
                  title: 'Atención!',
                  text: response.message,
                  type: 'warning'
                });
                this.trazabilidades = null;
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
        }else {
          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning'
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

  iniciarTabla(){
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

  onNew(trazabilidad: any){
    this.trazabilidad = trazabilidad;
    this.formEdit = false;
    this.formIndex = false;
    this.formShow = false;
    this.formNew = true;
  }

  onShow(trazabilidad: any) {
    this.trazabilidad = trazabilidad;
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formShow = true;
  }

  ready(isCreado:any){
      if(isCreado) {
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
        let token = this._loginService.getToken();
        this._TrazabilidadService.delete({ 'id': id },token).subscribe(
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

  onEdit(trazabilidad:any){
    this.formEdit = true;
  }
}