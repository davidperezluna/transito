import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CfgPropietarioService } from '../../../../services/cfgPropietario.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cfgPropietario.component.html'
})
export class CfgPropietarioComponent implements OnInit {
  public errorMessage;

  public imgUrl = environment.imgUrl;

  public table:any; 
  public propietario: any = null;
  
	public formNew: any = null;
	public formEdit: any = null;
  public formIndex: any = null;


  constructor(
    private _PropietarioService: CfgPropietarioService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    this.onInitForms();

    swal({
      title: 'Cargando datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._PropietarioService.index().subscribe(
				response => {
          if(response.code == 200){
            this.propietario = response.data;

            swal.close();
          }else{
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          }

          this.formIndex = true;
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

  onInitForms(){
    this.formNew = false;
	  this.formEdit = false;
    this.formIndex = false;
  }
  
  onNew(){
    this.onInitForms();

    this.formNew = true;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onEdit(propietario:any){
    this.onInitForms();
    
    this.propietario = propietario;

    this.formEdit = true;
  }
}