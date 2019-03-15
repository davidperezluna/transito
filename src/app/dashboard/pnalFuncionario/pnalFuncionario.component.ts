import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { PnalFuncionario } from './PnalFuncionario.modelo';
import { PnalCfgTipoNombramientoService } from '../../services/pnalCfgTipoNombramiento.service';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';
import { PnalCfgCargoService } from '../../services/pnalCfgCargo.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../services/login.service';
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
  public formNew = false;
  public formEdit = false;
  public formIndex = false;
  public formTime = false;
  public formShow = false;
  public formSuspension = false;
  public formProrroga = false;
  public formSearch = true;
  public table: any = null;
  public funcionario: PnalFuncionario;
  public numeroContrato: any;
  public tiposNombramiento: any;
  public tipoNombramientoSelected: any;
  public cargos: any;
  public cargoSelected: any;
  public organismosTransito: any;
  public organismoTransitoSelected: any;
  public resumen = {}; public datos = {
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
  }

  onNew() {
    this.formNew = true;
    this.formSearch = false;
    this.formTime = false;
    this.formShow = false;
    this.formProrroga = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  onProrroga(funcionario: any) {
    this.funcionario = funcionario;
    this.formProrroga = true;
    this.formNew = false;
    this.formSearch = false;
    this.formTime = false;
    this.formShow = false;
    this.formSuspension = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  onSuspension(funcionario: any) {
    this.funcionario = funcionario;
    this.formProrroga = false;
    this.formSuspension = true;
    this.formNew = false;
    this.formSearch = false;
    this.formTime = false;
    this.formShow = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }



  onTime(funcionario: any) {
    this.funcionario = funcionario;
    this.formTime = true;
    this.formNew = false;
    this.formSearch = false;
    this.formSuspension = false;
    this.formProrroga = false;
    this.formShow = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  onShow(funcionario: any) {
    this.funcionario = funcionario;
    this.formShow = true;
    this.formTime = false;
    this.formNew = false;
    this.formProrroga = false;
    this.formSearch = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formTime = false;
      this.formProrroga = false;
      this.formIndex = false;
      this.formShow = false;
      this.formSuspension = false;
      this.formSearch = true;
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
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });
    let token = this._loginService.getToken();
    this._FuncionarioService.searchByParametros(this.datos, token).subscribe(
      response => {
        if (response.status == 'success') {
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
            this.formIndex = false;
          }
          setTimeout(() => {
            this.iniciarTabla();
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

  iniciarTabla() {
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