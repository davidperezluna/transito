import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { rnaAsignacionInsumos } from '../imoAsignacion.modelo';
import { ImoLoteService } from '../../../services/imoLote.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../services/imoCfgTipo.service';
import { ImoInsumoService } from '../../../services/imoInsumo.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})

export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public apiUrl = environment.apiUrl + 'insumo/imolote';
public rnaAsignacionInsumos: rnaAsignacionInsumos;
public errorMessage;

public empresas:any;
public empresaSelected:any;
public organismosTransito:any;
public sedeSelected:any;
public sedeSelectedInsumo:any;
public frmInsumoSelectInsumo:any=true;
public insumos:any;
public sustratos:any;
public insumoSelect:any;
public loteInsumo:any;
public insumoSelected:any;
public lotes:any = null;
public lotesSeleccionados:any = [];
public insumoSelectedInsumo:any;
public date:any;
public numero:any;
public numeroActa: any = null;
public table:any;

public tipoInsumo: any = null;
public tiposInsumo = [
  {'value': 1, 'label': 'SUSTRATO'},
  {'value': 2, 'label': 'INSUMO'},
];

constructor(
  private _ImoLoteService: ImoLoteService,
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
        this.organismosTransito = response;
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

 

  isFin() {
   this.rnaAsignacionInsumos.numero = parseInt(this.rnaAsignacionInsumos.rangoFin) - parseInt(this.rnaAsignacionInsumos.rangoInicio)+1;
  }

  onChangedInsumoInsumo(e){
    if (e) {
      swal({
        title: 'Enviando datos!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      })
      let datos={
        'tipoInsumo':this.insumoSelectedInsumo,
      }

      let token = this._loginService.getToken();

      this._ImoLoteService.show(datos,token).subscribe( 
        response => {
          this.loteInsumo = response.data;

          if (response.status == 'success') {
            this.numero = this.loteInsumo.cantidad;

            swal.close()
          }else{
            this.numero = 0; 

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
      swal({
        title: 'Enviando datos!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      })

      if (this.table) {
        this.table.destroy()
      }

      let datos = {
        'tipoInsumo':this.insumoSelected,
        'idOrganismoTransito':this.sedeSelected,
      }

      let token = this._loginService.getToken();

      this._ImoLoteService.show(datos,token).subscribe( 
        response => {
          if (response.status == 'success') {
            this.lotes = response.data;

            swal.close()

            setTimeout(() => {
              this.onInitTable();
            });
          }else{
            this.lotes = null;

            swal({
              title: 'Error!',
              text: 'No existen sustratos para esta sede',
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
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


  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
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
  }

  onAsignarLote(lote){
    //let isLote = this.lotesSeleccionados.filter(h => h !== lote)
    console.log(lote);
    
    let validacion = false;
    let asignado = false;
    //Verifica que el arreglo de lotes tenga datos registrados
    if ( this.lotesSeleccionados.length > 0) {
      //Recorre todos los lotes seleccionados
      this.lotesSeleccionados.forEach(loteAsignado => {
          loteAsignado = Object.keys(loteAsignado).map(function(key) {
              return loteAsignado[key];
          });
          //Valida si el lote seleccionado actual ya se encuentra en el arreglo general de lotes
          validacion = loteAsignado.includes(lote.id, 0);
          //Si la validación es TRUE cambia de estado la bandera de asignado
          if (validacion) {
            asignado = true;
          }
      });
    }

    //Si el lote no esta asignado lo inserta
    if (!asignado) {
      this.lotesSeleccionados.push(
        {
          'idLote':lote.id,
          'tipo':lote.tipoInsumo.nombre,
          'idTipo':lote.tipoInsumo.id,
          'cantidad':lote.cantidad,
        }   
      );
    }else{
      swal({
        title: 'Atención!',
        text: 'El lote seleccionado ya fue asignado.',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onAsignarLoteInsumo(){  
    if (this.loteInsumo) {
      if(Number(this.numero) <= Number(this.loteInsumo.cantidad)){
        this.lotesSeleccionados.push(
          {
            'idLote':this.loteInsumo.id,
            'tipo':this.loteInsumo.tipoInsumo.nombre,
            'idTipo':this.loteInsumo.tipoInsumo.id,
            'cantidad':this.numero,
          }   
        );

        this.insumoSelectedInsumo = [];
        this.numero = 0;
        this.loteInsumo = false;
      }else{
        swal({
          title: 'Error!',
          text: 'Excede el numero de insumo',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  }

  onEliminarLoteSelecionado(lote){
    this.lotesSeleccionados = this.lotesSeleccionados.filter(h => h !== lote);
  }


  onEnviarArray(lote){
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
        swal({
          title: 'Enviando datos!',
          text: 'Solo tardara unos segundos por favor espere.',
          onOpen: () => {
            swal.showLoading()
          }
        })

        let token = this._loginService.getToken();

        this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelected;

        let datos={
          'asignacionInsumos' : this.rnaAsignacionInsumos,
          'array': this.lotesSeleccionados
        };
        
        this._ImoInsumoService.register(datos, token).subscribe(
          response => {
            if(response.status == 'success'){
              this.numeroActa = response.data;

              swal.close();
            }else{
              swal({
                title: 'Error!',
                text: response.message,
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

  onChangedOrganismoTransito(){
    this.lotesSeleccionados = [];
    this.lotes = null;
  }

  onPrintActa(){
    this.numeroActa = null;
    this.lotesSeleccionados = [];
    this.lotes = null;
    this.ngOnInit();
  }

}