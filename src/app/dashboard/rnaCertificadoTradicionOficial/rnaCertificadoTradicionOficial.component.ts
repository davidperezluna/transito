import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { VehiculoService } from '../../services/vehiculo.service';

import { environment } from 'environments/environment';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-certificadoTradicionOficial',
    templateUrl: './rnacertificadoTradicionOficial.html'
})
export class rnaCertificadoTradicionOficialComponent implements OnInit {
    public apiUrl = environment.apiUrl + 'default';
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any; 
    public sustratos: any;
    public vehiculo: any = false;
    public vehiculoRna: any = false;
    public placa: any;
    public sustratoSelected: any;
    public tipoRegrabacionList: string[];
    public tipoBlindajeList: string[];
    public tipoRegrabacionSelected: any;
    public nivelBlindajeList: string[];
    public motivoSelected: any;
    public nuevoNumero: any;
    public numeroRunt: any;
    public certificadoEntregado: any;
    public documentacion: any;
    public ciudadanoId: any;
    public entregada = false;
    public ciudadanoEncontrado=1;
    public ciudadanoNew = false;
    public ciudadano:any;
    public txt:any;
    public valido:any;
    public resumen = {};     
    public datos = {
        'nroRunt': null,
        'observacion': null,                  
        'certificadoEntregada': null,
        'entregado': null,
        'tramiteFormulario': null,
        'facturaId': null,
    };

    constructor(
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
      
    ) { }

    ngOnInit() {
       
        
    }

    
    ready(){ 
        this.ciudadanoEncontrado = 3;
    }
    onKeyValidateVehiculo(){
        swal({
          title: 'Buscando Vehiculo!',
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
            'placa' : this.placa
        }
        
        this._VehiculoService.showVehiculoPlaca(token, datos).subscribe(
          responseVehiculo => {
            if(responseVehiculo.status == 'success'){
              this.vehiculo = responseVehiculo.data;
              this._VehiculoService.showVehiculoRna(this.vehiculo.id, token).subscribe(
                response => {
                  if (response.status == 'success') {
                    this.vehiculoRna = response.vehiculo;
                    swal.close();
                  }else{
                    swal.close();
                    swal({
                      title: 'Error!',
                      text: response.message,
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                    })
                  }
                error => {
                  this.errorMessage = <any>error;
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              });
            }else{
              swal.close();
              swal({
                title: 'Error!',
                text: responseVehiculo.message,
                type: 'error',
                confirmButtonText: 'Aceptar'
              })
            }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        });
    }   
    
    async ngAbrirInput(){
        const {value: files} = await swal({
          title: 'Seleccione el atchivo .csv',
          input: 'file',
          inputAttributes: {
            'accept': 'txt/*',
            'aria-label': 'Upload your profile picture'
          }
        })
    
        if (files) {
          this.txt=[];	
          let reader: FileReader = new FileReader();
          reader.readAsBinaryString(files);
          reader.onload = (e) => {
            let txt: string = reader.result;
            let allTextLines = txt.split(/\r\n|\n/);
            for (let i = 0; i < allTextLines.length; i++) {
              let data = allTextLines[i].split(','); 
              if (data.length <= 0) {
                  this.valido = false;
              }else{
                if (data[0] != '') {
                  this.txt.push(data);
                }
              }
            }
            
            if (this.valido) {
              let token = this._loginService.getToken();
              console.log(this.txt);
            //   this._ComparendoService.setComparendoArchivo(this.txt,polca,token).subscribe(
            //     response => {
            //       if (response.status == 'success') {
            //         swal('Archivo cargado con exito')
            //         console.log(response);
            //       }
            //     }, 
            //     error => {
            //       this.errorMessage = <any>error;
            //       if(this.errorMessage != null){
            //         console.log(this.errorMessage);
            //         alert("Error en la petición");
            //       }
            //     }
            //   );
            }else{
              this.valido = true; 
              swal('Formato de archivo no valido');
                swal({
                  title: 'Error',
                  text: "Formato de archivo no valido!",
                  type: 'error',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Subir otro archivo!'
                }).then((result) => {
                  if (result.value) {
                    this.ngAbrirInput();
                  }
                })
            }    
          }
        }
      }   
}