import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgAdmFormatoService } from '../../../services/cfgAdmFormato.service';
import { CfgAdmFormatoTipoService } from '../../../services/cfgAdmFormatoTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() formato:any = null;
public errorMessage;
public formReady = false;
public tipos:any;

constructor(
  private _FormatoService: CfgAdmFormatoService,
  private _TipoService: CfgAdmFormatoTipoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){
    var EEButton = function (context) {
      var ui = $.summernote.ui;

      var list =
        "<div class='note-btn-group btn-group note-list col-xs-12 col-lg-12'>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='{NOM}'>" +
        "Nombre" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='{ID}'>" +
        "Identificación" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='{NOC}'>" +
        "No. orden comparendo" +
        "</li>" +
        "</div>";

      var button = ui.buttonGroup([
        ui.button({
          className: 'dropdown-toggle',
          contents: '<span class="text-primary fa fa-file-text"></span> <span class="caret"></span>',
          tooltip: "Parámetros de acto administrativo",
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

    $('#summernote').summernote('code', this.formato.cuerpo);

    this._TipoService.select().subscribe(
      response => {
        this.tipos = response;
        setTimeout(() => {
          this.formato.idTipo = [this.formato.tipo.id];
        })
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();

    this.formato.cuerpo = $('#summernote').summernote('code');
    
		this._FormatoService.edit(this.formato,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
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