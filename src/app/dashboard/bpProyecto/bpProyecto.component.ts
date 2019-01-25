import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BpProyectoService } from '../../services/bpProyecto.service';
import { LoginService } from '../../services/login.service';
import { BpProyecto } from './bpProyecto.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './bpProyecto.component.html'
})
export class BpProyectoComponent implements OnInit {
  public errorMessage;
	public id;
	public proyectos;
	public formNew = false;
	public formEdit = false;
	public formShow = false;
  public formIndex = true;
  public table:any; 
  public proyecto : BpProyecto;

  constructor(
    private _BpProyectoService: BpProyectoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._BpProyectoService.index().subscribe(
				response => {
          this.proyectos = response.data;
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
  }
  
  iniciarTabla(){  
    this.table = $('#dataTables-example').DataTable({
      destroy: true,
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
      this.formShow = false;
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
        let token = this._loginService.getToken();
        
        this._BpProyectoService.delete({ 'id': id }, token).subscribe(
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

  onEdit(proyecto :any){
    this.proyecto  = proyecto;
    this.formEdit = true;
    this.formIndex = false;
    this.formNew = false;
    this.formShow = false;
  }

  onShow(proyecto: any) {
    this.proyecto = proyecto;
    this.formShow = true;
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
  }
}