import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { RegistroRemolque } from '../rnrsPreregistro.modelo';
import { LoginService } from '../../../services/login.service';
import { RnrsPreregistroService } from '../../../services/rnrsPreregistro.service';
import { VhloCfgCarroceriaService } from '../../../services/vhloCfgCarroceria.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { VhloCfgOrigenRegistroService } from '../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgCondicionIngresoService } from '../../../services/vhloCfgCondicionIngreso.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})

export class NewRegistroRemolqueComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  
  public registroRemolque: RegistroRemolque;
  public errorMessage:any;

  public marcas:any; 
  public lineas:any;
  public carrocerias:any;
  public origenRegistros:any;
  public condicionIngresos:any;
  public clases:any;
  public persona:any='empresa';
  public sedeOperativa:any;
  public organismosTransito:any;
  public sedeOperativaSelected:any;
  public propietarios:any;
  public propietarioSelected:any;
  public radicado=false;
  public btnRadicado:any = 'Preregistro para matricula inicial';

constructor(
  private _RegistroRemolqueService: RnrsPreregistroService,
  private _LoginService: LoginService,
  private _LineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _MarcaService: VhloCfgMarcaService,
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,
  private _CondicionIngresoService: VhloCfgCondicionIngresoService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _loginService: LoginService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService
){}

ngOnInit() {
  let token = this._loginService.getToken();
  let identity = this._loginService.getIdentity();
  let datos = {'identificacion':identity.identificacion};
  this._FuncionarioService.searchLogin(datos,token).subscribe(
    response => { 
      if(response.status == 'success'){
        this.persona='funcionario';
        this.sedeOperativa = response.data.sedeOperativa;
        this.sedeOperativaSelected = [this.sedeOperativa.id];
      }else{
        this._FuncionarioService.searchEmpresa(datos,token).subscribe(
          response => {
            if(response.status == 'success'){
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

  this.registroRemolque = new RegistroRemolque(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
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

  this._MarcaService.getMarcaSelect().subscribe(
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
    this.registroRemolque.idSedeOperativa = this.sedeOperativaSelected;

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
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
               'Placa: <b>'+this.registroRemolque.placa+'</b><br>'+
               'Serie: <b>'+this.registroRemolque.serie+'</b><br>'+
               'Carga util: <b>'+this.registroRemolque.cargaUtil+'</b><br>'+
               'Peso vacio: <b>'+this.registroRemolque.pesoVacio+'</b><br>'+
               'Referencia: <b>'+this.registroRemolque.referencia+'</b><br>';
               'Ficha tecnica: <b>'+this.registroRemolque.numeroFth+'</b><br>'+
               

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

    this._RegistroRemolqueService.register(this.registroRemolque, token).subscribe(
			response => {
        if(response.status == 'success'){
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

      this._LineaService.searchByMarcaSelect({ 'idMarca': e }, token).subscribe(
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
  onRadicado(){
    if(this.radicado) {
      this.radicado = false; 
      this.btnRadicado = 'Preregistro para matricula inicial';
    }else{
      this.btnRadicado = 'Preregistro para radicado de cuenta';
      this.radicado = true; 
    }
  }
}