import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvEvaluacionService } from '../../services/msvEvaluacion.service';
import { EmpresaService } from '../../services/empresa.service';
import { MsvRevisionService } from '../../services/msvRevision.service';
import {LoginService} from '../../services/login.service';
import { MsvEvaluacion } from './msvEvaluacion.modelo';
import { MsvCategoriaService } from '../../services/msvCategoria.service';
import { Empresa } from '../empresa/empresa.modelo';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import { MsvCategoria } from '../msvCategoria/msvCategoria.modelo';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvEvaluacion.component.html'
})
export class MsvEvaluacionComponent implements OnInit {
  @Output() msvCategoria;  
  public errorMessage;
  public id;
  public msvEvaluaciones;
  public respuesta;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public newEmpresa = false;
  public revisionNew:boolean = false;
  public habilitarBotonRev:boolean = false;
  public revisionMensaje:boolean = false;
  public table:any;
  public isError:any; 
  public isExist:any; 
  public msj:any; 
  public nit:any; 
  public empresas:any;
  public miEmpresa:Empresa;
  public miRevision = null;
  public revisiones: any;
  public msvEvaluacion: MsvEvaluacion;
  public categoriaSelected: any;
  public msvCategorias:any;
  public resumen = {};     public datos = {'parametro': null,
                  'parametro2': null}

  constructor(
    private _EvaluacionService: MsvEvaluacionService,
    private _EmpresaService: EmpresaService,
    private _RevisionService: MsvRevisionService,
    private _loginService: LoginService,
    private _MsvCategoriaService: MsvCategoriaService,
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
    this._EvaluacionService.getEvaluacion().subscribe(
				response => {
          this.msvEvaluaciones = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
				}, 
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      );

    this._MsvCategoriaService.getCategoriaSelect().subscribe(
      response => {
        this.msvCategorias = response;
        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
        }, 100);
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
    this.newEmpresa = true;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.newEmpresa = false;
      this.revisionNew = false;
      this.ngOnInit();
    }
  }
  deletemsvEvaluacion(id:any){
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
        this._EvaluacionService.deleteEvaluacion(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
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

  onKeyValidateEvaluacion(){
    
    swal({
      title: 'Buscando Empresa!',
      text: 'Solo tardara unos segundos por favor espere.',
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
    
    this.revisionMensaje = false;
    this.revisionNew = false;
    let token = this._loginService.getToken();

    this._EmpresaService.showNitOrNombre(this.datos, token).subscribe(
      response => {
        if (response.status == 'success' ) {
          this.msj = response.msj;
          this.isError = false;
          this.miEmpresa = response.data;
          this.habilitarBotonRev = true;

          this._RevisionService.showRevision(token, this.miEmpresa.id).subscribe(
            response => {
              if (response.status == 'success' ) {
                this.msj = response.msj;
                this.isError = false;
                this.revisiones = response.data;                 
                this.isExist = true;
                swal.close();        
              }
              //si no existe revision coloca en true la variable para mostrar mensaje
              if(this.revisiones == false){
                this.revisionMensaje = true;
                }        
            error => { 
                this.errorMessage = <any>error;
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición"); 
                }
              }
          }); 
          
          this.isExist = true;
          
          swal.close();
        }
        if(response.code == 401){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          swal.close();
        }
        if(response.code == 400){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          
          swal.close();
        }

      error => { 
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición"); 
          }
        }
    });
    //let $empresaid = 

  }

  onKeyValidateRevision(){
    swal({
      title: 'Buscando Fechas de Revisión!',
      text: 'Solo tardara unos segundos por favor espere.',
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
    let token = this._loginService.getToken();
    
    this._RevisionService.showRevision(token,this.miEmpresa.id).subscribe(
      response => {
        if (response.code == 200 ) {
          this.msj = response.msj;
          this.isError = false;
          this.isExist = true;
          this.revisiones=response.data;
          this.miRevision = true;
          
          swal.close();
        }
        if(response.code == 401){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          swal.close();
        }
        if(response.code == 400){
          this.msj = response.msj;
          this.isError = true;
          this.isExist = false;
          
          swal.close();
        }
      error => { 
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición"); 
          }
        }
    });
  }

  onNewRevision(){
    this.revisionNew = true;
  }

  editmsvEvaluacion(msvEvaluacion:any){
    this.msvEvaluacion = msvEvaluacion;
    this.formEdit = true;
    this.formIndex = false;
  }
}