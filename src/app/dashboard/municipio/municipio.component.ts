import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MunicipioService} from '../../services/municipio.service';
import {LoginService} from '../../services/login.service';
import {Municipio} from './municipio.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './municipio.component.html'
})
export class MunicipioComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public municipios;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public municipio: Municipio;

  constructor(
		private _MunicipioService: MunicipioService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
		this._MunicipioService.getMunicipio().subscribe(
				response => {
          this.municipios = response.data;
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
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }
  deleteMunicipio(id:any){

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
        this._MunicipioService.deleteMunicipio(token,id).subscribe(
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

  editMunicipio(municipio:any){
    this.municipio = municipio;
    this.formEdit = true;
    this.formIndex = false;
  }

}