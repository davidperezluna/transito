import { Component, OnInit } from '@angular/core';
import { VhloTecnoMecanicaService } from '../../services/vhloTecnoMecanica.service';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloTecnoMecanica.component.html'
})

export class VhloTecnoMecanicaComponent implements OnInit {
  public errorMessage;
  
	public placa: any;
	public vehiculo: any = null;
	public tecnoMecanicas: any = null;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;

  constructor(
    private _TecnoMecanicaService: VhloTecnoMecanicaService,
    private _VehiculoService: VhloVehiculoService,
		private _LoginService: LoginService,
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
    });

    let token = this._LoginService.getToken();

    let datos = {
      'numero': this.placa
    }

    this._VehiculoService.searchByPlaca(datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.vehiculo = response.data;
          //Busca el historial de tecno mecanicas por vehiculo encontrado
          this._TecnoMecanicaService.index({'idVehiculo': this.vehiculo.id}, token).subscribe(
            response => {
              if (response.status == 'success') {
                this.tecnoMecanicas = response.data;

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