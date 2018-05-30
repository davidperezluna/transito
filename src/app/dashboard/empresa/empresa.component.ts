import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { LoginService } from '../../services/login.service';
import { Empresa } from './empresa.modelo';
// import { NewEmpresaComponent } from './new/new.component';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './empresa.component.html',
  // providers: [NewEmpresaComponent],
})
export class EmpresaComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public empresas;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public formShow = false;
  public table:any; 
  public empresa: Empresa;

  constructor(
		private _EmpresaService: EmpresaService,
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
		this._EmpresaService.getEmpresa().subscribe(
				response => {
          this.empresas = response.data;
          console.log(this.empresas);
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
      responsive: false,
      pageLength: 6,
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
        this.formShow = false;
        this.ngOnInit();
      }
  }
  deleteEmpresa(id:any){

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
        this._EmpresaService.deleteEmpresa(token,id).subscribe(
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

  editEmpresa(empresa:any){
    this.empresa = empresa;
    this.formEdit = true;
    this.formIndex = false;
  }

  getSucursal(empresa:any){
    this.empresa = empresa;
    this.formShow = true;
    this.formIndex = false;
  }

  onNewSucursal(){
    
  }

}