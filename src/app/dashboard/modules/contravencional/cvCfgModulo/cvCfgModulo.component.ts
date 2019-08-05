import { Component, OnInit } from '@angular/core';
import { CvCfgModuloService } from '../../../../services/cvCfgModulo.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvCfgModulo.component.html'
})

export class CvCfgModuloComponent implements OnInit {
  public errorMessage;

	public modulo: any;
	public modulos: any = null;
  
  public formNew: any;
	public formEdit: any;
  public formIndex: any;
  public formStates: any;

  public table: any = null;


  constructor(
    private _ModuloService: CvCfgModuloService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.onInitForms();

    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._ModuloService.index().subscribe(
      response => {
        this.modulos = response.data;

        let timeoutId = setTimeout(() => {
          this.onInitTable();
          this.formIndex = true;
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

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    this.formIndex = false;
    this.formStates = false;
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 10,
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
    this.onInitForms();
    this.formNew = true;
  }

  onState(modulo:any){
    this.onInitForms();
    this.modulo = modulo;
    this.formStates = true;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onEdit(modulo:any){
    this.onInitForms();
    this.modulo = modulo;
    this.formEdit = true;
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

        this._ModuloService.delete({'id':id}, token).subscribe(
          response => {
            if (response.code == 200) {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonColor: '#15d4be',
              });

              this.ngOnInit();
            }else{
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonColor: '#15d4be',
              });
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
    })
  }
}