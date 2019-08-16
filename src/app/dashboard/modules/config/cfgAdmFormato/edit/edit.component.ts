import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgAdmFormatoService } from '../../../../../services/cfgAdmFormato.service';
import { CfgAdmFormatoTipoService } from '../../../../../services/cfgAdmFormatoTipo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit-cfgadmformato',
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
        "<div class='note-btn-group btn-group note-list col-xs-12 col-lg-1'>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NOM'>" +
        "Nombre" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='ID'>" +
        "Identificación" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NOC'>" +
        "No. orden comparendo" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FC1'>" +
        "Fecha comparendo (dd mes YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FC2'>" +
        "Fecha comparendo (dd/mm/YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='DCI'>" +
        "Desc. infracción" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='PLACA'>" +
        "Placa de véhiculo" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='CS'>" +
        "Clase de servicio de véhiculo" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='CIC'>" +
        "Código de infracción" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FS1'>" +
        "Fecha sistema (dd mes YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FS2'>" +
        "Fecha sistema (dd/mm/YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='HS1'>" +
        "Hora sistema (HH:mm am/pm)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NMP'>" +
        "No. mandamiento de pago" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FMP1'>" +
        "Fecha mandamiento de pago (dd mes YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FMP2'>" +
        "Fecha mandamiento de pago (dd/mm/YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FR1'>" +
        "Fecha resolución de sanción (dd mes YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FR2'>" +
        "Fecha resolución de sanción (dd/mm/YYYY)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NRS'>" +
        "No. resolución de sanción" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NAP'>" +
        "No. acuerdo de pago" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FAP'>" +
        "Fecha acuerdo de pago" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NSAP'>" +
        "Persona suscribió el acuerdo de pago" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='VTM'>" +
        "Valor total de la multa" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='VTMI'>" +
        "Valor total de la multa con intereses" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='VIM'>" +
        "Valor total de intereses moratorios" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FHG'>" +
        "Fecha y la hora de documentación (DD/MM/YYYY HH:mm)" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NUG'>" +
        "Persona que genero el documento" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NCG'>" +
        "Cargo de persona que genero el documento" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FDPU'>" +
        "Firma de persona que genero el documento" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='NSTT'>" +
        "Subsecretario(a) de Tránsito y Transporte" +
        "</li>" +
        "<li class='note-btn btn btn-default btn-sm' data-text='FDSTT'>" +
        "Firma Subsecretario(a) de Tránsito y Transporte" +
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
    
		this._FormatoService.edit(this.formato, token).subscribe(
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