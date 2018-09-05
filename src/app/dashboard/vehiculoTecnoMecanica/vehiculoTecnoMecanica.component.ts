import { Component, OnInit } from '@angular/core';
import { TecnoMecanicaService } from '../../services/vehiculoTecnoMecanica.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vehiculoTecnoMecanica.component.html'
})
export class VehiculoTecnoMecanicaComponent implements OnInit {
  public errorMessage;
	public placa: any;
	public vehiculo: any = null;
	public tecnoMecanicas: any = null;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;

  constructor(
    private _TecnoMecanicaService: TecnoMecanicaService,
    private _VehiculoService: VehiculoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {  }

  onNew(){
    this.formNew = true;
    this.formIndex = false;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onSearch() {
    swal({
      title: 'Buscando vehiculo',
      text: 'Solo tardara unos segundos por favor espere.',
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

    let token = this._loginService.getToken();
    let datos = {
      'placa': this.placa
    }

    this._VehiculoService.showVehiculoPlaca(token, datos).subscribe(
      response => {
        if (response.status == 'success') {
          this.vehiculo = response.data;
          //Busca el historial de tecno mecanicas por vehiculo encontrado
          this._TecnoMecanicaService.index({'idVehiculo': this.vehiculo.id}, token).subscribe(
            response => {
              if (response.status == 'success') {
                this.tecnoMecanicas = response.data;
              } else {
                swal({
                  title: 'Alerta!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert('Error en la petición');
                }
              }
            }
          );
          swal.close();
        } else {
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );
  }
}