import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PqoCfgPatioService } from '../../../../../services/pqoCfgPatio.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  providers: [DatePipe]
})

export class ShowComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() patio:any = null;
public errorMessage;

public docsUrl = environment.docsUrl;

public identificacion: any = null;
public table: any = null;
public patioCiudadanos: any = null;
public formReady = false;
public fechaInicial: any = null;
public fechaFinal: any = null;

constructor(
  private _PatioService: PqoCfgPatioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ 
    swal({
      title: 'Cargando información!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    var datePiper = new DatePipe('en-US');

    var date = new Date();
    date.setTime(this.patio.fechaInicial.timestamp * 1000);

    this.fechaInicial = datePiper.transform(
      date, 'dd/MM/yyyy'
    );

    date.setTime(this.patio.fechaFinal.timestamp * 1000);
    this.fechaFinal = datePiper.transform(
      date, 'dd/MM/yyyy'
    );

    let token = this._LoginService.getToken();

    this._PatioService.searchCiudadanos({ 'id': this.patio.id }, token).subscribe(
			response => {
        if(response.code == 200){
          this.patioCiudadanos = response.data;

          let timeoutId = setTimeout(() => {  
            this.onInitTable();
          }, 100);

          swal.close();
        }else{
          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      }
    ); 
  }

  onInitTable(){
    if (this.table) {
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    swal({
      title: 'Buscando ciudadano!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'idPatio': this.patio.id,
      'identificacion': this.identificacion,
    }

		this._PatioService.assign(datos, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.ngOnInit();
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      }
    ); 
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
        let token = this._LoginService.getToken();

        this._PatioService.deleteCiudadano({ 'idPatioCiudadano': id },token).subscribe(
            response => {
              swal({
                title: 'Eliminado!',
                text: response.message,
                type:'success',
                confirmButtonColor: '#15d4be',
              });

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