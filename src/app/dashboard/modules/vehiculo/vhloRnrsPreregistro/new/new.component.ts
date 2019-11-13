import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloRegistroRemolque } from '../vhloRnrsPreregistro.modelo';
import { VhloRemolqueService } from '../../../../../services/vhloRemolque.service';
import { VhloCfgCarroceriaService } from '../../../../../services/vhloCfgCarroceria.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { VhloCfgOrigenRegistroService } from '../../../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgCondicionIngresoService } from '../../../../../services/vhloCfgCondicionIngreso.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-rnrspreregistro',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  
  public remolque: VhloRegistroRemolque;
  public errorMessage:any;

  public marcas:any; 
  public lineas:any;
  public carrocerias:any;
  public origenRegistros:any;
  public condicionIngresos:any;
  public clases:any;
  public persona:any='empresa';
  public organismosTransito:any;
  public sedeOperativaSelected:any;
  public propietarios:any;
  public propietarioSelected:any;
  public funcionario: any = null;

  public tiposPropiedad = [
    { 'value': 1, 'label': "Leasing" },
    { 'value': 2, 'label': "Propio" }
  ];

  public tiposMatricula = [
    { 'value': 'RADICADO', 'label': "Radicado de cuenta" },
    { 'value': 'MATRICULA', 'label': "Matricula inicial" },
    { 'value': 'IMPORTACION', 'label': "Importación temporal" },
    { 'value': 'CARPETA', 'label': "Cargue de carpeta" }
  ];

  public datos = {
    'propietarios': [],
    'solidario': false,
    'tipoPropiedad': null,
    'numeroLicencia': null,
    'fechaLicencia': null,
    'idVehiculo': null,
  };

  public radicado = {
    'fechaIngreso': null,
    'guiaLlegada': null,
    'empresaEnvio': null,
    'idOrganismoTransito': null,
    'idTipoIdentificacion': null,
  };

constructor(
  private _RemolqueService: VhloRemolqueService,
  private _LineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _MarcaService: VhloCfgMarcaService,
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,
  private _CondicionIngresoService: VhloCfgCondicionIngresoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _LoginService: LoginService,
){}

ngOnInit() {
  let token = this._LoginService.getToken();
  let identity = this._LoginService.getIdentity();
  let datos = {'identificacion':identity.identificacion};
  this._FuncionarioService.searchLogin(datos,token).subscribe(
    response => { 
      if(response.code == 200){
        this.funcionario = response.data;
        this.persona='funcionario';
        this.sedeOperativaSelected = [this.funcionario.organismoTransito.id];
      }else{
        this._FuncionarioService.searchEmpresa(datos,token).subscribe(
          response => {
            if(response.code == 200){
              this.persona='empresa';
            }
      
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
    error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage); 
          alert('Error en la petición');
        }
      }
  });

  this.remolque = new VhloRegistroRemolque(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
  this._OrganismoTransitoService.selectSedes().subscribe(
    response => {
      this.organismosTransito = response;
    }, 
    error => {
      this.errorMessage = <any>error;

      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );
  this._CarroceriaService.select().subscribe(
    response => {
      this.carrocerias = response;
    }, 
    error => {
      this.errorMessage = <any>error;

      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._MarcaService.select().subscribe(
    response => {
      this.marcas = response;
    }, 
    error => { 
      this.errorMessage = <any>error;

      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._OrigenRegistroService.select().subscribe(
    response => {
      this.origenRegistros = response; 
    }, 
    error => { 
      this.errorMessage = <any>error;
      
      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._CondicionIngresoService.select().subscribe(
    response => {
      this.condicionIngresos = response;
    },  
    error => {
      this.errorMessage = <any>error;
      
      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._ClaseService.select().subscribe(
    response => {
      this.clases = response;
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

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();
    this.remolque.idSedeOperativa = this.sedeOperativaSelected;

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
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

    var html = 'los datos de la maquinaria a ingresar son:<br>'+
               'Placa: <b>'+this.remolque.placa+'</b><br>'+
               'Serie: <b>'+this.remolque.serie+'</b><br>'+
               'Carga util: <b>'+this.remolque.cargaUtil+'</b><br>'+
               'Peso vacio: <b>'+this.remolque.pesoVacio+'</b><br>'+
               'Referencia: <b>'+this.remolque.referencia+'</b><br>';
               'Ficha tecnica: <b>'+this.remolque.numeroFth+'</b><br>'+
               

   swal({
      title: 'Preregistro de maquinaria!',
      type: 'warning',
      html:html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Crear!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No crear',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
        if (result.value) {

    this._RemolqueService.register(this.remolque, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
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

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}

    }); 
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {

        }
      })
  }

  onChangedMarca(e) {
    if (e) {    
      let token = this._LoginService.getToken()

      this._LineaService.selectByMarca({ 'idMarca': e }, token).subscribe(
        response => {
          this.lineas = response;
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
  }
}