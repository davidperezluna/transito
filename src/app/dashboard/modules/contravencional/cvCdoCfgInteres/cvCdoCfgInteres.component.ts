import { Component, OnInit } from '@angular/core';
import { CvCdoCfgInteresService } from '../../../../services/cvCdoCfgInteres.service';
import { LoginService } from '../../../../services/login.service';
import { CvCdoCfgInteres } from './cvCdoCfgInteres.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvCdoCfgInteres.component.html'
})
export class CvCdoCfgInteresComponent implements OnInit {
  public errorMessage;
	public id;

	public intereses;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public interes: CvCdoCfgInteres;

  constructor(
    private _CfgInteresService: CvCdoCfgInteresService,
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

    this._CfgInteresService.index().subscribe(
				response => {
          this.intereses = response.data;
          let timeoutId = setTimeout(() => {  
            this.onInitTable();
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

  onInitTable(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
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
        
        this._CfgInteresService.delete({'id':id}, token).subscribe(
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

  onEdit(interes:any){
    this.interes = interes;
    this.formEdit = true;
    this.formIndex = false;
  }
}