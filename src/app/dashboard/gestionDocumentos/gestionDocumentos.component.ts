import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PeticionarioService } from '../../services/peticionario.service';
import { GestionDocumentos } from './gestionDocumentos.modelo';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './gestionDocumentos.component.html'
})
export class GestionDocumentosComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
  public peticionarios;
  public peticionario: GestionDocumentos;
	public formNew = false;
	public formEdit = false;
  public table:any; 
  public gestionDocumentos:any; 
  public documentoEncontrado = false;
  public crearDocumento = false;

  constructor(
		private _PeticionarioService: PeticionarioService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: '<i>Para Tener En Cuenta</i>',
      type: 'info',
      html:
        '<p style="text-align:justify;"><b>- DERECHO DE PETICIÓN EN INTERÉS GENERAL Y PARTICULAR:</b>'+
        ' El que tiene toda persona para presentar solicitudes respetuosas ante las autoridades consagrado en el articulo'+
        '23 de la constitucion política como derecho fundamental. Termino de respuesta 15 días</p>'+
        '<p style="text-align:justify;"><b>- DERECHO DE PETICIÓN DE INFORMACIÓN:</b> Petición para que el funcionario de a conocer como ha actuado en un caso determinado o permita el '+
        'examen de los documentos públicos o expida copia de los mismos. Termino para Resolver 10 días </p>',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });

    this.peticionario = new GestionDocumentos(null,null,null,null,null,null,null,null,null);
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
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.ngOnInit();
      }
  }
  deleteGestionDocumentos(id:any){

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
        this._PeticionarioService.deletePeticionario(token,id).subscribe(
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

  editGestionDocumentos(gestionDocumentos:any){
    this.gestionDocumentos = gestionDocumentos;
    this.formEdit = true;
  }

  onBuscarRegistros(){
    let datos = {
      'tipo' : this.peticionario.tipo,
      'identificacion' : this.peticionario.identificacion,
      'entidad' : this.peticionario.nombreEntidad,
      'numeroOficio' : this.peticionario.numeroOficio
    }
    let token = this._loginService.getToken();
		this._PeticionarioService.buscarPeticionario(datos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
           this.documentoEncontrado = true;
           this.crearDocumento = false;
           this.peticionarios = response.data;

          swal({
            title: 'Perfecto',
            text: "¡Documento encontrado!",
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
          this.documentoEncontrado = false;
          this.crearDocumento = true;
          swal({
            title: 'Alerta',
            text: "¡No existe el documento!",
            type: 'warning',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
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
}