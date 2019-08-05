import { Component, OnInit } from '@angular/core';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
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
    public funcionario:any = null;

    public txt: any[];
    public valido:any = true;

    public formIndex = false;
    public formUpload = false;

    public file: any = null;
    public fileSelected: File = null;

    public tipos = [
      {'value': 'IDENTIFICACION', 'label': 'IDENTIFICACION'},
      {'value': 'PLACA', 'label': 'PLACA'},
    ];

    public datos = {
      'tipo': null,
      'idFuncionario': null,
    }

    constructor(
      private _VehiculoService: VhloVehiculoService,
      private _FuncionarioService: PnalFuncionarioService,
      private _LoginService: LoginService,
      
    ) { }

    ngOnInit() {
      this.onInitForms();

      let token = this._LoginService.getToken();
      
      let identity = this._LoginService.getIdentity();

      this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
        response => {
            if (response.status == 'success') {
              this.funcionario = response.data; 
            } else {
              this.funcionario = null;

              swal({
                  title: 'Error!',
                  text: 'Usted no tiene permisos para realizar la impresión.',
                  type: 'error',
                  confirmButtonText: 'Aceptar'
              });
            }
            this.formIndex = true;
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

    onInitForms(){
      this.formIndex = false;
      this.formUpload = false;
    }

    onSearchVehiculo(){
      swal({
        title: 'Buscando Vehiculo!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

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

    onFormUpload() {
      this.onInitForms();
  
      this.formUpload = true;
    }
  
    onFileChange(event) {
      if (event.target.files.length > 0) {
        this.fileSelected = event.target.files[0];
  
        this.file = new FormData();
        this.file.append('file', this.fileSelected);
      }
    }

    ready(isCreado: any) {
      if (isCreado) {
        this.ngOnInit();
      }
    }

    onEnviar(){
      if (this.fileSelected) {
        swal({
          title: 'Generando certificado!',
          text: 'Solo tardara unos segundos por favor espere.',
          onOpen: () => {
            swal.showLoading()
          }
        });
  
        let token = this._LoginService.getToken();

        this.datos.idFuncionario = this.funcionario.id;
  
        this._VehiculoService.certificadoTradicionByFile(this.file, this.datos, token).subscribe(
          response => {
            if (response.type == 'application/json') {
              swal({
                title: 'Error!',
                text: 'No existen tramites realizados o el formato no es .CSV',
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            } else {
              var fileURL = URL.createObjectURL(response);
              window.open(fileURL);

              swal.close();
            }
            error => {
              this.errorMessage = <any>error;
  
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          }
        );
      } else {
        swal({
          title: 'Error!',
          text: 'Debe adjuntar el archivo plano.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
}