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
import { UserCfgTipoIdentificacionService } from 'app/services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from 'app/services/userCiudadano.service';
import { VhloPropietarioService } from 'app/services/vhloPropietario.service';

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
  public organismoTransitoSelected:any;
  public propietarios:any;
  public propietarioSelected:any;
  public apoderadoSelected:any;
  
  public tipoIdentificacionSelected: any;
  public tiposIdentificacion: any;
  
  public identificacion:any;
  public identificacionApoderado:any;
  
  public ciudadano: any = null;
  public apoderado: any = null;
  public empresa: any = null;

  public formApoderado = false;
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
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _CiudadanoService: UserCiudadanoService,
  private _PropietarioService: VhloPropietarioService,
  private _LoginService: LoginService,
){}

ngOnInit() {
  let token = this._LoginService.getToken();
  let identity = this._LoginService.getIdentity();
  let datos = {'identificacion':identity.identificacion};

  this._TipoIdentificacionService.select().subscribe(
    response => {
      this.tiposIdentificacion = response;
    },
    error => {
      this.errorMessage = <any>error;

      if (this.errorMessage != null) {
        console.log(this.errorMessage);
        alert('Error en la petición');
      }
    }
  );

  this._FuncionarioService.searchLogin(datos,token).subscribe(
    response => { 
      if(response.code == 200){
        this.funcionario = response.data;
        this.persona='funcionario';
        /* this.organismoTransitoSelected = [this.funcionario.organismoTransito.id]; */
        this.remolque.idOrganismoTransito = this.funcionario.organismoTransito.id;

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

  this.remolque = new VhloRegistroRemolque(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
  /* this._OrganismoTransitoService.selectSedes().subscribe(
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
  ); */
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

  ngOnDestroy() {
    console.log('destroyed!!');
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    var html = 'Los datos del remolque a registrar son:<br>'+
               'Placa: <b>'+this.remolque.placa+'</b><br>'+
               'Serie: <b>'+this.remolque.serie+'</b><br>'+
               'Carga util: <b>'+this.remolque.cargaUtil+'</b><br>'+
               'Peso vacio: <b>'+this.remolque.pesoVacio+'</b><br>'+
               'Referencia: <b>'+this.remolque.referencia+'</b><br>';
               'Ficha tecnica: <b>'+this.remolque.numeroFth+'</b><br>'+
               

   swal({
      title: 'Preregistro de remolque y semiremolque!',
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
            if (response.code == 200) {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });

              if (this.remolque.tipoMatricula == 'RADICADO' || this.remolque.tipoMatricula == 'IMPORTACION') {
                console.log("si entra al registro de propietarios");
                this.datos.idVehiculo = response.data.vehiculo.id;

                this._PropietarioService.register(this.datos, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this.ready.emit(true);
                    }
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert('Error en la petición');
                    }
                  }
                );
              } else {
                this.ready.emit(true);

                swal({
                  title: response.title,
                  text: response.message,
                  type: response.status,
                  confirmButtonText: 'Aceptar'
                })
              }

            } else {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
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

          }
        );
      }
    });
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

  onChangedClase(e) {
    if (e) {
      let token = this._LoginService.getToken()

      this._CarroceriaService.selectByClase({ 'idClase': e }, token).subscribe(
        response => {
          this.carrocerias = response;
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

  /* onUpdate() {
    this.remolque.vehiculo.vin = this.remolque.vehiculo.chasis;
    this.remolque.vehiculo.serie = this.remolque.vehiculo.chasis;
  } */

  onSearchCiudadano() {
    swal({
      title: 'Buscando ciudadano!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion': this.identificacion,
      'idTipoIdentificacion': this.tipoIdentificacionSelected,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.ciudadano) {
            this.ciudadano = response.data.ciudadano;

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          this.ciudadano = null;

          swal({
            title: 'Error!',
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

  onSearchApoderado() {
    swal({
      title: 'Buscando apoderado!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion': this.identificacionApoderado,
      'idTipoIdentificacion': 1,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.ciudadano) {
            this.apoderado = response.data.ciudadano;
          } else {
            this.apoderado = response.data.empresa;
          }

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          this.apoderado = null;

          swal({
            title: 'Error!',
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

  onAddCiudadano() {
    let agregado = this.datos.propietarios.includes(this.ciudadano.identificacion, 1);

    if (agregado) {
      swal({
        title: 'Error!',
        text: 'El registro seleccionado ya se encuentra agregado como propietario.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.datos.propietarios.push(
        {
          'idPropietario': this.ciudadano.id,
          'identificacion': this.ciudadano.identificacion,
          'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre,
          'permiso': this.datos.solidario,
          'tipo': 'Ciudadano',
          'idApoderado': null,
          'apoderadoIdentificacion': null,
          'apoderado.Nombre': null,
        }
      );
    }
  }

  onAddEmpresa() {
    this.datos.propietarios.push(
      {
        'idPropietario': this.empresa.id,
        'identificacion': this.empresa.nit,
        'nombre': this.empresa.nombre,
        'permiso': this.datos.solidario,
        'tipo': 'Empresa',
        'idApoderado': null,
        'apoderadoIdentificacion': null,
        'apoderado.Nombre': null,
      }
    );
  }

  onDeletePropietario(propietario: any): void {
    this.datos.propietarios = this.datos.propietarios.filter(h => h !== propietario);
  }

  onNewApoderado(propietario: any) {
    let agregado = this.datos.propietarios.includes(propietario.identificacion, 1);

    if (agregado) {
      swal({
        title: 'Error!',
        text: 'El registro seleccionado ya se encuentra agregado como apoderado.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.formApoderado = true;
      this.propietarioSelected = this.datos.propietarios.filter(h => h == propietario);
      this.propietarioSelected = this.propietarioSelected[0];
    }
  }

  onAddApoderado(apoderado) {
    let posicion = this.datos.propietarios.indexOf(this.propietarioSelected);

    this.datos.propietarios[posicion].idApoderado = apoderado.id;
    this.datos.propietarios[posicion].apoderadoIdentificacion = apoderado.identificacion;
    this.datos.propietarios[posicion].apoderadoNombre = apoderado.primerNombre + " " + apoderado.primerApellido;
  }

  onCancelarApoderado() {
    this.apoderado = null;
    this.formApoderado = false;
  }
}