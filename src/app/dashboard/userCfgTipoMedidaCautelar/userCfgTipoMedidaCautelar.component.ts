import { Component, OnInit } from '@angular/core';
import { UserCfgTipoMedidaCautelarService } from '../../services/userCfgTipoMedidaCautelar.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './userCfgTipoMedidaCautelar.component.html'
})

export class UserCfgTipoMedidaCautelarComponent implements OnInit {
  public errorMessage;
	public tipoMedidaCautelar: any;
	public tiposMedidasCautelares: any = null;
  
  public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table: any = null;


  constructor(
    private _LoginService: LoginService,
    private _UserCfgTipoMedidaCautelarService: UserCfgTipoMedidaCautelarService,
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
    this._UserCfgTipoMedidaCautelarService.index().subscribe(
				response => {
          this.tiposMedidasCautelares = response.data;
          let timeoutId = setTimeout(() => {
            this.onInitTable();
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


  onInitTable(){
    if(this.table) {
      this.table.destroy();
    }
    this.table = $('#dataTables-example').DataTable({
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

  onDelete(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminará este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._UserCfgTipoMedidaCautelarService.delete({'id': id}, token).subscribe(
          response => {
            if(response.code == 200){
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonColor: '#15d4be',
              })
              this.table.destroy();
              this.ngOnInit();
            } else {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonColor: '#15d4be',
              })
            }
          },
          error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }
    })
  }

  onEdit(tipoMedidaCautelar:any){
    this.tipoMedidaCautelar = tipoMedidaCautelar;
    this.formEdit = true;
    this.formIndex = false;
  }
}