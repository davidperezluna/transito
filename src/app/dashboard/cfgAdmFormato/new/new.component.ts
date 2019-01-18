import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CfgAdmFormato } from '../cfgAdmFormato.modelo';
import { CfgAdmFormatoService } from '../../../services/cfgAdmFormato.service';
import { CfgAdmFormatoTipoService } from '../../../services/cfgAdmFormatoTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public formato: CfgAdmFormato;
public errorMessage;
public tipos: any;

constructor(
  private _FormatoService: CfgAdmFormatoService,
  private _TipoService: CfgAdmFormatoTipoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.formato = new CfgAdmFormato(null, null, null, null, null, null);

    var EEButton = function (context) {
      var ui = $.summernote.ui;

      var list =
        "<div class='note-btn-group btn-group note-list col-xs-12 col-lg-12'>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='{EstablecimientoEducativoNombre}'>" +
        "Nombre" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='{EstablecimientoEducativoMunicipio}'>" +
        "Municipio" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='{EstablecimientoEducativoArea}'>" +
        "Area" +
        "</li>" +
        "</div>";

      var button = ui.buttonGroup([
        ui.button({
          className: 'dropdown-toggle',
          contents: '<span class="text-primary fa fa-user"></span> <span class="caret"></span>',
          tooltip: "Parámetros de establecimiento educativo",
          data: {
            toggle: 'dropdown'
          }
        }),
        ui.dropdown({
          className: 'drop-default summernote-list',
          contents: list,
          callback: function ($dropdown) {
            $dropdown.find('li').each(function () {
              $(this).click(function () {
                context.invoke("editor.insertText", $(this).data('text'));
              });
            });
          }
        })
      ]);

      return button.render();
    }

    $('#summernote').summernote({
      placeholder: 'Diligencie el cuerpo de la plantilla',
      tabsize: 2,
      height: 800,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['btnEE', ['ee']]
      ],
      buttons: {
        ee: EEButton
      }
    });

    this._TipoService.select().subscribe(
      response => {
        this.tipos = response;
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

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();

    this.formato.cuerpo = $('#summernote').summernote('code');
    
		this._FormatoService.register(this.formato,token).subscribe(
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
  }

}