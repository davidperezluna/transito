import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import {LoginService} from '../../services/login.service';
import { MpersonalTipoContratoService } from '../../services/mpersonalTipoContrato.service';
import { SedeOperativaService } from '../../services/sedeOperativa.service';
import { MpersonalFuncionario } from './mpersonalFuncionario.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './mpersonalFuncionario.component.html'
})
export class MpersonalFuncionarioComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public funcionarios;
	public formNew = false;
	public formEdit = false;
	public formIndex = false;
	public formTime = false;
  public formSearch = true;
  public table: any = null;
  public funcionario: MpersonalFuncionario;
  public identificacion:any;
  public nombre:any;
  public cargo:any;
  public tiposContrato: any;
  public tipoContratoSelected: any;
  public sedesOperativas: any;
  public sedeOperativaSelected: any;
  public datos = {
    'nombre' : null,
    'identificacion' : null,
    'cargo' : null,
    'tipoContratoId' : null,
    'sedeOperativaId' : null
  }

  constructor(
    private _FuncionarioService: MpersonalFuncionarioService,
    private _TipoContratoService: MpersonalTipoContratoService,
    private _SedeOperativaService: SedeOperativaService,
    private _loginService: LoginService,
    private router: Router
    ){}
    
  ngOnInit() {
    this._TipoContratoService.select().subscribe(
      response => {
        this.tiposContrato = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
  
  onNew(){
    this.formNew = true;
    this.formSearch = false;
    this.formTime = false;
    this.formIndex = false;
    if(this.table){
      this.table.destroy();
    }
  }
  onTime(funcionario:any){
    this.funcionario = funcionario;
    this.formTime = true;
    this.formNew = false;
    this.formSearch = false;
    this.formIndex = false;
    if(this.table){
      this.table.destroy();
    }
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formTime = false;
      this.formIndex = false;
      this.formSearch = true;
      this.ngOnInit();
    }
  }
  
  search(){
    this.datos.nombre = this.nombre;
    this.datos.identificacion = this.identificacion;
    this.datos.cargo = this.cargo;
    this.datos.tipoContratoId = this.tipoContratoSelected;
    this.datos.sedeOperativaId = this.sedeOperativaSelected;
    
    let token = this._loginService.getToken();
		this._FuncionarioService.searchByParametros(this.datos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.funcionarios = response.data;
          this.iniciarTabla();
          this.formIndex = true;

          swal({
            title: 'Perfecto',
            text: "¡Funcionarios encontrados!",
            type: 'info',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
          });
        }else{
          swal({
            title: 'Alerta',
            text: "¡No existen funcionarios, por favor registrelo y vuelva vincularse!",
            type: 'warning',
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Registrar',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Cancelar',
            cancelButtonAriaLabel: 'Thumbs down',
          }).then((result) => {
            if (result.value) {
              this.formNew = true;
              this.formSearch = false;
            }
          });
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

  delete(id:any){
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
        this._FuncionarioService.delete(token,id).subscribe(
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

  edit(funcionario:any){
    this.funcionario = funcionario;
    this.formEdit = true;
    this.formSearch = false;
  }
}