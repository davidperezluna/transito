import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { PnalFuncionario } from './PnalFuncionario.modelo';
import { PnalCfgTipoNombramientoService } from '../../../../services/pnalCfgTipoNombramiento.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { PnalCfgCargoService } from '../../../../services/pnalCfgCargo.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './pnalFuncionario.component.html'
})
export class PnalFuncionarioComponent implements OnInit {
  public errorMessage;
  public id;
  public funcionarios;

  public formNew: any;
  public formEdit: any;
  public formIndex: any;
  public formReport: any;
  public formTime: any;
  public formShow: any;
  public formSuspension: any;
  public formDisabled: any;
  public formProrroga: any;
  public formSearch: any;

  public table: any = null;
  public funcionario: PnalFuncionario;
  public numeroContrato: any;
  public tiposNombramiento: any;
  public tipoNombramientoSelected: any;
  public cargos: any;
  public cargoSelected: any;
  public organismosTransito: any;
  public organismoTransitoSelected: any;

  public datos = {
    'nombre': null,
    'identificacion': null,
    'cargo': null,
    'idTipoNombramiento': null,
    'idOrganismoTransito': null,
    'numeroContrato': null,
    'fechaInicio': null,
    'fechaFin': null,
    'nombramiento': null,
  }

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _TipoNombramientoService: PnalCfgTipoNombramientoService,
    private _CargoService: PnalCfgCargoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onInitForms();

    swal({
      title: 'Cargando información!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._TipoNombramientoService.select().subscribe(
      response => {
        this.tiposNombramiento = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._CargoService.select().subscribe(
      response => {
        this.cargos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    swal.close();
    this.formSearch = true;
  }

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formReport = false;
    this.formTime = false;
    this.formShow = false;
    this.formSuspension = false;
    this.formDisabled = false;
    this.formProrroga = false;
    this.formSearch = false;
  }

  onReport() {
    this.onInitForms();
    this.formReport = true;
  }

  onNew() {
    this.onInitForms();
    this.formNew = true;
  }

  onProrroga(funcionario: any) {
    this.onInitForms();
    this.funcionario = funcionario;
    this.formProrroga = true;
  }

  onSuspension(funcionario: any) {
    this.onInitForms();
    this.funcionario = funcionario;
    this.formSuspension = true;
  }

  onTime(funcionario: any) {
    this.onInitForms();
    this.funcionario = funcionario;
    this.formTime = true;
  }

  onShow(funcionario: any) {
    this.onInitForms();
    this.funcionario = funcionario;
    this.formShow = true;
  }

  onDisabled(funcionario: any) {
    this.funcionario = funcionario;

    swal({
      title: '¿Estás seguro?',
      text: "¡Se inhabilitará este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.onInitForms();
        this.formDisabled = true;
      }
    });
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.ngOnInit();
    }
  }

  onSearch() {
    this.funcionarios = null;
    this.datos.cargo = this.cargoSelected;
    this.datos.idTipoNombramiento = this.tipoNombramientoSelected;
    this.datos.idOrganismoTransito = this.organismoTransitoSelected;

    swal({
      title: 'Cargando !',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading();
      }
    });

    let token = this._loginService.getToken();

    this._FuncionarioService.searchByParametros(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.datos.nombre = null;
          this.cargoSelected = null;
          this.tipoNombramientoSelected = null;
          this.organismoTransitoSelected = null;
          this.datos.identificacion = null;
          this.datos.cargo = null;
          this.datos.fechaFin = null;
          this.datos.fechaInicio = null;
          this.datos.nombramiento = null;
          this.datos.numeroContrato = null;
          this.funcionarios = response.data;

          if (this.table) {
            this.table.destroy();
          }

          setTimeout(() => {
            this.onInitTable();
            this.formIndex = true;
          });
          
          swal.close();
        } else {
          swal({
            title: 'Alerta',
            text: response.message,
            type: 'warning',
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Registrar',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i> Cancelar',
            cancelButtonAriaLabel: 'Thumbs down',
          }).then((result) => {
            if (result.value) {
              this.formNew = true;
              this.formSearch = false;
              this.formIndex = false;
            }
          });
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
    $('#dataTables-example').DataTable({
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
    this.table = $('#dataTables-example').DataTable();
  }

  delete(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._FuncionarioService.delete({'id': id}, token).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            })
            this.table.destroy();
            this.ngOnInit();
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
    })
  }

  onChangedTipoNombramiento(e) {
    if (e) {
      if (e != 2) {
        this.datos.numeroContrato = null;
        this.datos.fechaFin = null;
        this.datos.fechaInicio = null;
      }
      if (e != 1) {
        this.datos.nombramiento = null;
      }
    }
  }

  onEdit(funcionario: any) {
    this.funcionario = funcionario;
    this.formEdit = true;
    this.formSearch = false;
  }
}