import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {rnaAsignacionInsumos} from '../imoAsignacion.modelo';
import {RnaLoteInsumoService} from '../../../services/rnaloteInsumos.service';
import {LoginService} from '../../../services/login.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../services/imoCfgTipo.service';
import {ImoInsumoService} from '../../../services/imoInsumo.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public rnaAsignacionInsumos: rnaAsignacionInsumos;
public errorMessage;
public respuesta;
public empresas:any;
public empresaSelected:any;
public sedes:any;
public sedeSelected:any;
public sedeSelectedInsumo:any;
public frmInsumoSelectInsumo:any=true;
public insumos:any;
public sustratos:any;
public insumoSelect:any;
public loteInsumo:any;
public insumoSelected:any;
public lotes:any;
public insumoSelectedInsumo:any;
public date:any;
public numero:any;
public frmInsumo:any=false;
public frmInsumoSelect:any=true; 
public table:any; 
constructor(
  private _rnaRegistroInsumosService: RnaLoteInsumoService,
  private _loginService: LoginService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  private _ImoInsumoService: ImoInsumoService,
  ){}

  ngOnInit() {
    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.rnaAsignacionInsumos = new rnaAsignacionInsumos(null,null,null,null,null,null,null,null,null,null);
    this.rnaAsignacionInsumos.fecha = datePiper.transform(this.date,'yyyy-MM-dd');


    this._CasoInsumoService.getCasoInsumoInsumoSelect().subscribe(
      response => {
        this.insumos = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CasoInsumoService.getCasoInsumoSustratoSelect().subscribe(
      response => {
        this.sustratos = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.sedes = response;
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
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.rnaAsignacionInsumos.loteInsumoId = this.loteInsumo.id;
    
    if (!this.frmInsumo) {
      this.rnaAsignacionInsumos.casoInsumoId = this.insumoSelected;
      this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelected;
    }else{
      this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelectedInsumo;
      this.rnaAsignacionInsumos.casoInsumoId = this.insumoSelectedInsumo;
      this.rnaAsignacionInsumos.numero = this.numero;
    }
    
		this._ImoInsumoService.register(this.rnaAsignacionInsumos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El codigo ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}

		}); 
  }
  isFin() {
   this.rnaAsignacionInsumos.numero = parseInt(this.rnaAsignacionInsumos.rangoFin) - parseInt(this.rnaAsignacionInsumos.rangoInicio)+1;
  }

  changedSedeOperativa(e){
    if (e) {  
      this.frmInsumoSelect = false;
    }
  }

  changedSedeOperativaInsumo(e){
    if (e) {
      this.frmInsumoSelectInsumo = false;
    }
  }

  changedInsumoInsumo(e){
    if (e) {
      let datos={
        'casoInsumo':this.insumoSelectedInsumo,
        'sedeOperativa':this.sedeSelectedInsumo,
      }
      let token = this._loginService.getToken();
      this._rnaRegistroInsumosService.showInsumo(datos,token).subscribe(
        response => {
          this.loteInsumo = response.data;
          if (response.status == 'success') {
            this.numero = this.loteInsumo.cantidad;
          }else{
            swal({
              title: 'Error!',
              text: 'No existen insumos para esta sede',
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
          
        error => {
            this.errorMessage = <any>error;

            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }

      });
      
    } 
  }

  onSearchLote(){
      if (this.table) {
        this.table.destroy()
      }
      let datos={
        'casoInsumo':this.insumoSelected,
        'sedeOperativa':this.sedeSelected,
      }
      let token = this._loginService.getToken();
      this._rnaRegistroInsumosService.showSedeInsumo(datos,token).subscribe( 
        response => {
          
          if (response.status == 'success') {
            this.lotes = response.data;
            setTimeout(() => {
              this.iniciarTabla();
            });
           

          }else{
            this.lotes = null;
            swal({
              title: 'Error!',
              text: 'No existen sustratos para esta sede',
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
          
        error => {
            this.errorMessage = <any>error;

            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }

      });
  }

  onInsumo() {
    this.frmInsumo = true;
  }
  onSustrato() {
    this.frmInsumo = false;
  }

  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
           oPaginate: {
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }

  onAsignarLote(lote){

    swal({
      title: '¿Confirmar?',
      text: "¿Desea asignar los sustratos?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this.rnaAsignacionInsumos.loteInsumoId = lote.id;
        this.rnaAsignacionInsumos.casoInsumoId = this.insumoSelected;
        this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelected;
        this.rnaAsignacionInsumos.rangoInicio = lote.rangoInicio;
        this.rnaAsignacionInsumos.rangoFin = lote.rangoFin;
        this.rnaAsignacionInsumos.numero = lote.cantidad;

        this._ImoInsumoService.register(this.rnaAsignacionInsumos,token).subscribe(
          response => {
            this.respuesta = response;
            if(this.respuesta.status == 'success'){
              this.ready.emit(true);
              swal({
                title: 'Perfecto!',
                text: 'Registro exitoso!',
                type: 'success',
                confirmButtonText: 'Aceptar'
              })
            }else{
              swal({
                title: 'Error!',
                text: 'El codigo ya se encuentra registrado',
                type: 'error',
                confirmButtonText: 'Aceptar'
              })
            }
          error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
        }); 
      }
    })   
  }

}