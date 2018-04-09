import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GrupoSanguineoService } from '../../services/grupoSanguineo.service';
import { LoginService } from '../../services/login.service';
import { GrupoSanguineo } from './grupoSanguineo.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './grupoSanguineo.component.html'
})
export class GrupoSanguineoComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public gruposSanguineos;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public grupoSanguineo: GrupoSanguineo;

  constructor(
    private _GrupoSanguineoService: GrupoSanguineoService,
		private _loginService: LoginService,
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
    this._GrupoSanguineoService.getGrupoSanguineo().subscribe(
				response => {
          this.gruposSanguineos = response.data;
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
  deleteGrupoSanguineo(id:any){
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
        this._GrupoSanguineoService.deleteGrupoSanguineo(token,id).subscribe(
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

  editGrupoSanguineo(grupoSanguineo:any){
    this.grupoSanguineo = grupoSanguineo;
    this.formEdit = true;
    this.formIndex = false;
  }
}