import { Component, OnInit } from '@angular/core';
import { VhloTecnoMecanica } from "./vhloTecnoMecanica.modelo";
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
  public formHistorial = false;
	public formEdit = false;
  public formIndex = true;

  public tecnoMecanica = VhloTecnoMecanica;

  constructor(
    private _TecnoMecanicaService: VhloTecnoMecanicaService,
    private _VehiculoService: VhloVehiculoService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {  }

  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.formHistorial = false;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formHistorial = false;
      this.formIndex = true;
      this.onSearch();
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

    this._VehiculoService.searchByPlaca({ 'numero': this.placa }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.vehiculo = response.data;
          this.formHistorial = true;
          //Busca el historial de tecno mecanicas por vehiculo encontrado
          this._TecnoMecanicaService.index({'idVehiculo': this.vehiculo.id}, token).subscribe(
            response => {
              if (response.status == 'success') {
                console.log(this.formHistorial);
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

        this._TecnoMecanicaService.delete({ 'id': id }, token).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: response.message,
              type: 'success',
              confirmButtonColor: '#15d4be',
            })
            this.onSearch();
            /* this.table.destroy(); */
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
    });
  }

  onEdit(tecnoMecanica: any) {
    this.tecnoMecanica = tecnoMecanica;
    this.formEdit = true;
    this.formNew = false;
    this.formIndex = false;
    this.formHistorial = false;
  }
}