import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Convenio } from '../convenio/new/convenio.modelo';
import { VhloTpConvenioService } from '../../../services/vhloTpConvenio.service';



import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'convenio-show',
  templateUrl: './show.component.html'
})
export class ShowConvenioComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() empresa:any = null;
public errorMessage;
public respuesta;
public sucursal: Convenio;
public municipio: any;
public convenios: any;
public municipioSelected: any;
public tipoSociedadSelected :any;

public formListaConvenioes = false;
public table:any; 
public formNewConvenio = false;
public cargar = true;
public checked:any;

constructor(
  
  private _VhloTpConvenioService: VhloTpConvenioService,
  private _loginService: LoginService,
  
  ){}

  ngOnInit() {

    console.log(this.empresa);
    this._VhloTpConvenioService.getVhloTpConvenioEmpresa(this.empresa.id).subscribe(
      response => {
        if(response.status == "success"){
       this.convenios=response.data;
       this.formListaConvenioes = true;
        }else{
          this.formNewConvenio = true;
        }
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
  
  onCancelar(){
    this.ready.emit(true);


  }

  readyConvenio(respuesta:any){
    
    this.formListaConvenioes=true;
    this.formNewConvenio=false;
  }


  onNewConvenio(){
      this.formListaConvenioes=false;
      this.formNewConvenio=true;
  }
  
  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-forward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-backward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }

  deleteConvenio(id:any){

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
        this._VhloTpConvenioService.deleteVhloTpConvenio(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  // this.table.destroy();
                  this.respuesta= response;
                  this.formListaConvenioes=false;
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