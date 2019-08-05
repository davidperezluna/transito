import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ImoCfgTipoService } from '../../../../../services/imoCfgTipo.service';
import { ImoCfgValorService } from '../../../../../services/imoCfgValor.service';
import { LoginService } from '../../../../../services/login.service';
import { CfgModuloService } from '../../../../../services/cfgModulo.service';
import swal from 'sweetalert2';
declare var $: any;

 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() tipoInsumo: any = null;
  public errorMessage;
  public formNewValor: any=false;
  public modulos: any;
  public table: any;
  public moduloSelected: any; 
  public valores: any; 
  
  
  public categorias = [
    { 'value': "INSUMO", 'label': "INSUMO" },
    { 'value': "SUSTRATO", 'label': "SUSTRATO" }
  ];
  public categoriaSelected: any;

  constructor(
    private _ImoCfgTipoService: ImoCfgTipoService,
    private _loginService: LoginService,
    private _ImoCfgValorService: ImoCfgValorService,
    private _ModuloService: CfgModuloService,
  ) {}

  ngOnInit() {
    let token = this._loginService.getToken();

    this.categoriaSelected = this.tipoInsumo.categoria;

    this._ModuloService.select().subscribe(
      response => {
        this.modulos = response;
        setTimeout(() => {
          this.moduloSelected = [this.tipoInsumo.modulo.id];
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
    this._ImoCfgValorService.show(this.tipoInsumo.id, token).subscribe(
      response => {
        this.valores = response.data;
        let timeoutId = setTimeout(() => {
          this.onInitTable();
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
    this.ready.emit(true);
  }

  onEnviar() {
    let token = this._loginService.getToken();
    
    this.tipoInsumo.idModulo = this.moduloSelected;
    this.tipoInsumo.categoria = this.categoriaSelected;

    this._ImoCfgTipoService.edit(this.tipoInsumo, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
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

      });
  }

  onInitTable() {
    this.table = $('#dataTables-example-valor').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
  }

  onNew(){
    this.formNewValor = true;
  }
  
  readyValor(){
    this.formNewValor = false;
    this.ngOnInit();
  }
}