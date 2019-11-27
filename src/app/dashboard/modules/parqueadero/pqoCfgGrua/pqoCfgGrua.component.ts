import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PqoCfgGrua } from './pqoCfgGrua.modelo';
import { PqoCfgGruaService } from '../../../../services/pqoCfgGrua.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './pqoCfgGrua.component.html'
})
export class PqoCfgGruaComponent implements OnInit, AfterViewChecked {
  public errorMessage;

	public gruas;
  public formIndex: any;
	public formNew: any;
	public formEdit: any;
	public formShow: any;
  public table:any; 
  public grua: PqoCfgGrua;

  constructor(
    private _GruaService: PqoCfgGruaService,
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

    this.onInitForms();
    this.formIndex = true;
    
    this._GruaService.index().subscribe(
      response => {
        this.gruas = response.data;
        
        let timeoutId = setTimeout(() => {
          this.onInitTable();
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

  ngAfterViewChecked(){
    swal.close();
  }

  onInitForms(){
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
    this.formShow = false;
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
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
    this.onInitForms();
    this.formNew = true;
  }

  onCiudadanos(grua:any){
    this.grua = grua;
    this.onInitForms();
    this.formShow = true;
  } 

  ready(isCreado:any){
    if(isCreado) {
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
        this._GruaService.delete(token,id).subscribe(
            response => {
                swal({
                  title: 'Eliminado!',
                  text:'Registro eliminado correctamente.',
                  type:'success',
                  confirmButtonColor: '#15d4be',
                });
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

  onEdit(grua:any){
    this.grua = grua;
    this.formEdit = true;
    this.formIndex = false;
  }
}