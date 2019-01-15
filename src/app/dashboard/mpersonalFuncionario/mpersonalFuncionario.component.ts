import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { LoginService } from '../../services/login.service';
import { MpersonalTipoContratoService } from '../../services/mpersonalTipoContrato.service';
import { CfgCargoService } from '../../services/cfgCargo.service';
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
	public formShow = false;
	public formSuspension = false;
	public formProrroga = false;
  public formSearch = true;
  public table: any = null;
  public funcionario: MpersonalFuncionario;
  public identificacion:any;
  public nombre:any;
  public cargo:any;
  public numeroContrato:any;
  public tiposContrato: any;
  public tipoContratoSelected: any;
  public cargos: any;
  public cargoSelected: any;
  public sedesOperativas: any;
  public sedeOperativaSelected: any;
  public resumen = {};     public datos = {
    'nombre' : null,
    'identificacion' : null,
    'cargo' : null,
    'tipoContratoId' : null,
    'sedeOperativaId' : null,
    'numeroContrato' : null,
    'fechaInicio':null,
    'fechaFin':null,
    'nombramiento':null,
  }

  constructor(
    private _FuncionarioService: MpersonalFuncionarioService,
    private _TipoContratoService: MpersonalTipoContratoService,
    private _CargoService: CfgCargoService,
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

    this._CargoService.select().subscribe(
      response => {
        this.cargos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
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
    this.formShow = false;
    this.formProrroga = false;
    this.formIndex = false;
    if(this.table){
      this.table.destroy();
    }
  }

  onProrroga(funcionario:any){
    this.funcionario = funcionario;
    this.formProrroga = true;
    this.formNew = false;
    this.formSearch = false;
    this.formTime = false;
    this.formShow = false;
    this.formSuspension = false;
    this.formIndex = false;
    if(this.table){
      this.table.destroy();
    }
  }
  
  onSuspension(funcionario:any){
    this.funcionario = funcionario;
    this.formProrroga = false;
    this.formSuspension = true;
    this.formNew = false;
    this.formSearch = false;
    this.formTime = false;
    this.formShow = false;
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
    this.formSuspension = false;
    this.formProrroga = false;
    this.formShow = false;
    this.formIndex = false;
    if(this.table){
      this.table.destroy();
    }
  }

  onShow(funcionario: any) {
    this.funcionario = funcionario;
    this.formShow = true;
    this.formTime = false;
    this.formNew = false;
    this.formProrroga = false;
    this.formSearch = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formTime = false;
      this.formProrroga = false;
      this.formIndex = false;
      this.formShow = false;
      this.formSuspension = false;
      this.formSearch = true;
      this.ngOnInit();
    }
  }
  
  onSearch(){
    this.funcionarios = null;
    this.datos.nombre = this.nombre;
    this.datos.identificacion = this.identificacion;
    this.datos.cargo = this.cargoSelected;
    this.datos.tipoContratoId = this.tipoContratoSelected;
    this.datos.sedeOperativaId = this.sedeOperativaSelected;

    swal({
      title: 'Cargando !',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
          swal.showLoading();
      }
    }).then((result) => {
        if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
        ) {
        }
    });

    
    let token = this._loginService.getToken();
		this._FuncionarioService.searchByParametros(this.datos,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.nombre = null;
          this.cargoSelected = null;
          this.tipoContratoSelected = null;
          this.sedeOperativaSelected = null;
          this.identificacion= null;
          this.datos.cargo = null;
          this.datos.fechaFin = null;
          this.datos.fechaInicio = null;
          this.datos.nombramiento = null;
          this.datos.numeroContrato = null;
          this.funcionarios = response.data;
          console.log(this.funcionarios);
          if (this.table) {
            this.table.destroy();
            this.formIndex = false;
          }
          setTimeout(() => {
            this.iniciarTabla();
            this.formIndex = true;
          });
          swal.close();
        }else{
          swal({
            title: 'Alerta',
            text: response.message,
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
              this.formIndex = false;
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

  onChangedTipoContrato(e){
    if (e) {
      if (e != 2) {
        this.datos.numeroContrato = null;
        this.datos.fechaFin = null;
        this.datos.fechaInicio = null;
      }
      if (e != 1) {
        this.datos.nombramiento = null;
      }
    }
  }

  onEdit(funcionario:any){
    this.funcionario = funcionario;
    this.formEdit = true;
    this.formSearch = false;
  }
}