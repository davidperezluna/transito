import { Component, OnInit } from '@angular/core';
import { SvIpatImpresoAsignacion } from './svIpatImpresoAsignacion.modelo';
import { SvIpatImpresoAsignacionService } from '../../services/svIpatImpresoAsignacion.service';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';
import { LoginService } from '../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svIpatImpresoAsignacion.component.html'
})

export class SvIpatImpresoAsignacionComponent implements OnInit {
  public errorMessage;

  public apiUrl = environment.apiUrl + 'seguridadvial/svipatimpresoasignacion';

	public asignaciones;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any = null; 
  public funcionario:any = null; 
  public asignacion: SvIpatImpresoAsignacion;

  constructor(
    private _BodegaService: SvIpatImpresoAsignacionService,
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

    this._BodegaService.index().subscribe(
      response => {
        this.asignaciones = response.data;
        let timeoutId = setTimeout(() => {  
          this.iniciarTabla();
        }, 100);
        swal.close();
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data; 
        } else {
          this.funcionario = null;

          swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar la impresión.',
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
        
        this._BodegaService.delete({'id':id}, token).subscribe(
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

  onEdit(asignacion:any){
    this.asignacion = asignacion;
    this.formEdit = true;
    this.formIndex = false;
  }
}