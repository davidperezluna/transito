import { Component, OnInit } from '@angular/core';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';
import { LoginService } from '../../services/login.service';
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
          title: 'Subiendo datos!',
          text: 'Solo tardara unos segundos por favor espere.',
          onOpen: () => {
            swal.showLoading()
          }
        });
  
        let token = this._LoginService.getToken();

        this.datos.idFuncionario = this.funcionario.id;
  
        this._VehiculoService.certificadoTradicionByFile(this.file, this.datos, token).subscribe(
          response => {
            if (response.code == 200) {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });
            } else {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });
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
    
    /*
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
              let data = allTextLines[i].split(';'); 
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

              let datos = {
                'identificaciones': this.txt,
                'idFuncionario': this.funcionario.id,
              }

              this._VehiculoService.certificadoTradicionByFile(datos, token).subscribe(
                response => {
                  var fileURL = URL.createObjectURL(response);
                  window.open(fileURL);
                }, 
                error => {
                  this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              );
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
      } */  
}