import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloRegistroRemolque } from './vhloRnrsPreregistro.modelo';
import { VhloRemolqueService } from '../../../../services/vhloRemolque.service';
import { LoginService } from '../../../../services/login.service';

declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnrsPreregistro.component.html'
})

export class VhloRnrsPreregistroComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
  public vehiculos;
  public registrosRemolque;
  public formIndex = true;
  public formNew = false;
  public formEdit= false;
  public table:any; 
  public registroRemolque: VhloRegistroRemolque;

  constructor(
    private _RegistroRemolqueService: VhloRemolqueService,
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

    this.formEdit=false;
    this.formNew=false;

    this._RegistroRemolqueService.index().subscribe(
      response => {
        this.registrosRemolque = response.data;

        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
        }, 100);
        swal.close();
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
   
  iniciarTabla(){
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
  onNew(){
    this.formIndex = false;
    this.formNew = true;
    this.table.destroy();
  }
  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }
  editRemolque(registroRemolque:any){
    this.registroRemolque = registroRemolque;
    this.formIndex = false;
    this.formEdit = true;
  }
  deleteRemolque(id:any){

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
        this._RegistroRemolqueService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
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

}