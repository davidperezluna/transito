import { Component, OnInit } from '@angular/core';
import { CvCdoTrazabilidad } from './cvCdoTrazabilidad.modelo';
import { CvCdoTrazabilidadService } from '../../../../services/cvCdoTrazabilidad.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { CvCdoCfgEstadoService } from '../../../../services/cvCdoCfgEstado.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvCdoTrazabilidad.component.html'
})

export class CvCdoTrazabilidadComponent implements OnInit {
  public errorMessage;
  
  public apiUrl = environment.apiUrl;

  public numero: any = null;
  public comparendo: any = null;
  public estados: any = null;
	public trazabilidades: any = null;
	public acuerdoPago: any = null;
	public formNew = false;
	public formEdit = false;
  public formIndex = false;
  public formSearch = true;
  public formAcuerdoPago = false;
  public table:any; 
  public trazabilidad: CvCdoTrazabilidad;

  constructor(
    private _TrazabilidadService: CvCdoTrazabilidadService,
    private _ComparendoService: CvCdoComparendoService,
    private _EstadoService: CvCdoCfgEstadoService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    this._EstadoService.select().subscribe(
      response => {
        this.estados = response;
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

  onInitTable(){
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

  onSearch() {
    let token = this._LoginService.getToken();

    this._ComparendoService.searchByNumber({'numero':this.numero }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.comparendo = response.data;
          this.formIndex = true;

          swal({
            title: 'Buscando trazabilidad!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
              swal.showLoading()
            }
          });

          this._ComparendoService.record({ 'id': this.comparendo.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.trazabilidades = response.data.trazabilidades;
                this.acuerdoPago = response.data.acuerdoPago;

                let timeoutId = setTimeout(() => {
                  this.onInitTable();
                }, 100);

                swal.close();
              } else {
                swal({
                  title: 'Error!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });

                this.trazabilidades = null;
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
        }else {
          this.comparendo = null;
          this.formIndex = false;

          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
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
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onDelete(id:any){
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
        let token = this._LoginService.getToken();
        
        this._TrazabilidadService.delete({'id':id}, token).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.ngOnInit();
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
    })
  }

  onEdit(trazabilidad:any){
    this.trazabilidad = trazabilidad;
    this.formEdit = true;
    this.formIndex = false;
  }
}