import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';

import { environment } from 'environments/environment';

import swal from 'sweetalert2';

@Component({
    selector: 'app-certificado-tradicion',
    templateUrl: './vhloCertificadoTradicion.html'
})

export class VhloCertificadoTradicionComponent implements OnInit {
  public errorMessage;
    public apiUrl = environment.apiUrl + 'default';

    public tramiteFacturaSelected: any; 
    public sustratos: any;
    public vehiculo: any = null;
    public placa: any;

    public txt:any;
    public valido:any;

    constructor(
      private _VehiculoService: VhloVehiculoService,
      private _LoginService: LoginService,
      
    ) { }

    ngOnInit() { }

    onSearchVehiculo(){
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
        let token = this._LoginService.getToken();
        
        this._VehiculoService.searchByPlaca({ 'numero': this.placa }, token).subscribe(
          response => {
            if(response.status == 'success'){
              this.vehiculo = response.data;
              swal.close();
            }else{
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
    }   
    
    async ngAbrirInput(){
        const {value: files} = await swal({
          title: 'Seleccione el archivo .csv',
          input: 'file',
          inputAttributes: {
            'accept': 'csv/*',
            'aria-label': 'Cargar archivo plano'
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
              let token = this._LoginService.getToken();
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