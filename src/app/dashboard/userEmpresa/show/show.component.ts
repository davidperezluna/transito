import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { LoginService } from '../../../services/login.service';


import { Sucursal } from '../sucursal/new/sucursal.modelo';
import { SucursalService } from '../../../services/sucursal.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { TipoSociedadService } from '../../../services/tipoSociedad.service';


import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'sucursal-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() empresa:any = null;
public errorMessage;
public respuesta;
public sucursal: Sucursal;
public municipio: any;
public sucursales: any;
public municipioSelected: any;
public tipoSociedadSelected :any;

public formListaSucursales = false;
public table:any; 
public formNewSucursal = false;
public cargar = true;
public checked:any;

constructor(
  private _EmpresaService: UserEmpresaService,
  private _MunicipioService: CfgMunicipioService,
  private _SucursalService: SucursalService,
  private _TipoSociedadService: TipoSociedadService,
  private _loginService: LoginService,
  
  ){}

  ngOnInit() {

console.log(this.empresa)

    console.log(this.empresa);
    this._SucursalService.getSucursalEmpresa(this.empresa.id).subscribe(
      response => {
        if(response.status == "success"){
       this.sucursales=response.data;
       this.formListaSucursales = true;
        }else{
          this.formNewSucursal = true;
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

  readySucursal(respuesta:any){
    
    this.ngOnInit();
    this.formListaSucursales=false;
    this.formNewSucursal=false;
  }


  onNewSucursal(){
      this.formListaSucursales=false;
      this.formNewSucursal=true;
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

  deleteSucursal(id:any){

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
        this._SucursalService.deleteSucursal(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  // this.table.destroy();
                  this.respuesta= response;
                  this.formListaSucursales=false;
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