import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ImoCfgTipoService } from '../../../services/imoCfgTipo.service';
import { ImoCfgValorService } from '../../../services/imoCfgValor.service';
import { LoginService } from '../../../services/login.service';
import { CfgModuloService } from '../../../services/cfgModulo.service';
import swal from 'sweetalert2';
declare var $: any;

 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() cfgCasoInsumo: any = null;
  public errorMessage;
  public respuesta;
  public formNewValor: any=false;
  public modulos: any;
  public table: any;
  public moduloSelected: any; 
  public valores: any; 
  
  
  public tipoCasoInsumos = [
    { 'value': "Insumo", 'label': "Insumo" },
    { 'value': "Sustrato", 'label': "Sustrato" }
  ];
  public tipoCasoInsumoSelected: any;
  // public tipoIdentificacion: Array<any>

  constructor(
    private _ImoCfgTipoService: ImoCfgTipoService,
    private _loginService: LoginService,
    private _ImoCfgValorService: ImoCfgValorService,
    private _ModuloService: CfgModuloService,
  ) {}

  ngOnInit() {
    this._ModuloService.select().subscribe(
      response => {
        this.modulos = response;
        setTimeout(() => {
          this.moduloSelected = [this.cfgCasoInsumo.modulo.id];
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    let token = this._loginService.getToken();
    this._ImoCfgValorService.showCasoInsumo(token,this.cfgCasoInsumo.id).subscribe(
      response => {
        this.valores = response.data;
        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
        }, 100);
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


  onCancelar() {
    if (this.table) {
      this.table.destroy();
    }
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    this.cfgCasoInsumo.moduloId = this.moduloSelected;
    this._ImoCfgTipoService.edit(this.cfgCasoInsumo, token).subscribe(
      response => {
        //console.log(response);
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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

  iniciarTabla() {
    $('#dataTables-example-valor').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<<',
          sPrevious: '<',
          sNext: '>',
          sLast: '>>'
        }
      }
    });
    this.table = $('#dataTables-example-valor').DataTable();
  }

  onNew(){
    this.formNewValor = true;
  }
  
  readyValor(){
    this.formNewValor = false;
    this.ngOnInit();
  }

}