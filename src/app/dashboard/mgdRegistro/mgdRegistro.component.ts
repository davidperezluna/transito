import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MgdPeticionarioService } from '../../services/mgdPeticionario.service';
import { MgdDocumentoService } from '../../services/mgdDocumento.service';
import { MgdRegistro } from './mgdRegistro.modelo';
import { LoginService } from '../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './mgdRegistro.component.html'
})
export class MgdRegistroComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
  public documentos;
  public peticionario: MgdRegistro;
	public formNew = false;
  public formEdit = false;
  public formShow = false;
  public formSearch = true;
  public table:any;
  public documento:any;
  public mgdRegistros:any;
  public docsUrl = environment.docsUrl;

  constructor(
    private _PeticionarioService: MgdPeticionarioService,
    private _DocumentoService: MgdDocumentoService,
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

    this.peticionario = new MgdRegistro(null,null,null,null,null);
    this.peticionario.tipo = 'Persona';
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
    this.formSearch = false;
    this.formShow = false;
    this.documentos = null;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formShow = false;
        this.formSearch = true;
        this.ngOnInit();
      }
  }

  readyDocument(documento:any){
    this.documento = documento;
    if(this.documento) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = true;
      this.formSearch = false;
      //this.ngOnInit();
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

  editGestionDocumentos(mgdRegistros:any){
    this.mgdRegistros = mgdRegistros;
    this.formEdit = true;
  }

  onBuscarDocumentos(){
    let datos = {
      'tipo' : this.peticionario.tipo,
      'identificacion' : this.peticionario.identificacion,
      'entidadNombre' : this.peticionario.entidadNombre,
      'numeroOficio' : this.peticionario.numeroOficio
    }
    let token = this._loginService.getToken();
		this._DocumentoService.buscarDocumentos(datos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
           this.formNew = false;
           this.formSearch = true;
           this.documentos = response.data;

           this.iniciarTabla();

          swal({
            title: 'Perfecto',
            text: "¡Documentos encontrados!",
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
          this.formNew = true;
          this.formSearch = false;
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