import { Component, OnInit} from '@angular/core';
import { ImoTrazabilidadService } from '../../../../services/imoTrazabilidad.service';
import { ImoAsignacionService } from '../../../../services/imoAsignacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-reasignacion-insumo',
  templateUrl: './imoReasignacion.component.html',
  providers: [DatePipe] 
})

export class ImoReasignacionComponent implements OnInit {
  public errorMessage;
  public formIndex = true;
  public formNew = false;
  public formShow = false;

  public funcionario: any = null;
  public reasignaciones:any;
  public table: any = null;

  public idReasignacion:any;

constructor(
  private _ImoTrazabilidadService: ImoTrazabilidadService,
  private _AsignacionService: ImoAsignacionService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data; 
        } else {
          this.funcionario = null;

          swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar la impresión.',
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

    this._ImoTrazabilidadService.index().subscribe(
      response => {
        this.reasignaciones = response.data; 
        let timeoutId = setTimeout(() => {
          this.onInitTable();
          swal.close();
        }, 100);
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

  onShow(id:any){
    this.idReasignacion = id;
    this.formIndex = false;
    this.formNew = false; 
    this.formShow = true;
    this.table.destroy();
  }

  onNew(){
    this.formIndex = false;
    this.formNew = true;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formShow = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }

  onInitTable() {
    if (this.table) {
      this.table.destroy();
    }
    
    this.table = $('#dataTables-example').DataTable({
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

  onPrint(idTrazabilidad: any){
    swal({
      title: 'Generando acta!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._AsignacionService.printReasignacion({ 'idTrazabilidad': idTrazabilidad, 'idFuncionario': this.funcionario.id }, token).subscribe((response)=>{     
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL);
      swal.close();
    })
  }
}