import { Component, OnInit } from '@angular/core';
import { PnalCfgCdoConsecutivo } from './pnalCfgCdoConsecutivo.modelo';
import { PnalCfgCdoConsecutivoService } from '../../../../services/pnalCfgCdoConsecutivo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './pnalCfgCdoConsecutivo.component.html'
})

export class PnalCfgCdoConsecutivoComponent implements OnInit {
  public errorMessage;

	public consecutivos;
	public funcionario: any;
	public formNew = false;
	public formEdit = false;
  public formShow = false;
  public formSearch = true;
  public table: any;
  public parametro: any;
  
  public datos = {
    'parametro' : null
  }

  constructor(
    private _ConsecutivoService: PnalCfgCdoConsecutivoService,
    private _FuncionarioService: PnalFuncionarioService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {}

  onSearch(){   
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    
    this.datos.parametro = this.parametro;

		this._ConsecutivoService.searchByFuncionario(this.datos, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.consecutivos = response.data;

          this.onInitTable();

          swal({
            title: 'Perfecto',
            text: response.message,
            type: 'info',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Atención',
            text: response.message,
            type:'warning',
            confirmButtonColor: '#15d4be',
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

  onInitTable(){
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
    this.formSearch = false;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formSearch = true;
      this.ngOnInit();
    }
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
        let token = this._LoginService.getToken();
        this._ConsecutivoService.delete(token,id).subscribe(
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
    });
  }
}