import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PeticionarioService } from '../../services/peticionario.service';
import {LoginService} from '../../services/login.service';
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
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public gestionDocumentos:any; 

  constructor(
		private _PeticionarioService: PeticionarioService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: '<i>Para Tener En Cuenta</i>',
      type: 'info',
      html:
        '<p>-DERECHO DE PETICIÓN EN INTERÉS GENERAL Y PARTICULAR </p>'+
        '<P style="text-align:justify;"> PARTICULAR: El que tiene toda persona para presentar solicitudes respetuosas ante las autoridades consagrado en el articulo'+ 
        '23 de la constitucion política como derecho fundamental. Termino de respuesta 15 días</P>'+
        '<P style="text-align:justify;"> DERECHO DE PETICIÓN DE INFORMACIÓN: Petición para que el funcionario de a conocer como ha actuado en un caso determinado o permita el '+ 
        'examen de los documentos públicos o expida copia de los mismos. Termino para Resolver 10 días </P>',
        
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    })
    
		this._PeticionarioService.getPeticionario().subscribe(
				response => {
          this.peticionarios = response.data;
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
    this.formIndex = false;
  }

}