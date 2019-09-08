import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../../../services/login.service';
import { ImoInsumoService } from '../../../../../services/imoInsumo.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show-insumo-busqueda',
  templateUrl: './show.component.html',
  providers: [DatePipe]
})
export class ShowComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() insumos:any = null;
@Input() loteInsumo:any = null;
public errorMessage;

public apiUrl = environment.apiUrl + 'insumo/imolote';

public table:any;

constructor(
  private _LoginService: LoginService,
  private _ImoInsumoService: ImoInsumoService,
  ){}

  ngOnInit() {
    let timeoutId = setTimeout(() => {  
      this.onInitTable();
    }, 200);
  }

  onInitTable(){
    // Setup - add a text input to each footer cell
    /*$('#dataTables-example-sustratos thead th.filter').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" class="filter" placeholder="'+title+'" />' );
    } );*/

    this.table = $('#dataTables-example-sustratos').DataTable({
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

    // Apply the search
    this.table.columns().every( function () {
      var that = this;

      $('input', this.header() ).on('keyup change', function () {
          if ( that.search() !== this.value ) {
              that
                  .search( this.value )
                  .draw();
          }
      } );
    });
  }

  onDelete(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se anulara el sustrato!",
      input: 'textarea',
      inputPlaceholder: 'Por favor diligencia el motivo de la anulación.',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value != "") {
        this.insumos = null;

        swal({
          title: 'Anulando sustrato!',
          text: 'Solo tardara unos segundos por favor espere.',
          onOpen: () => {
            swal.showLoading()
          }
        });

        let token = this._LoginService.getToken();

        this._ImoInsumoService.delete({ 'id': id, 'motivo': result.value }, token).subscribe(
          response => {
          swal({
            title: 'Perfecto!',
            text: 'Sustrato anulado con éxito.',
            type: 'success',
            confirmButtonColor: '#15d4be',
          });

          this._ImoInsumoService.showLote(this.loteInsumo.id, token).subscribe(
            response => {
              if(response.code == 200){
                this.insumos = response.data;
                this.ngOnInit();
              }
              error => {
                this.errorMessage = <any>error;
    
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }    
            }); 
          }, 
          error => {
            this.errorMessage = <any>error;

            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }else{
        swal({
          title: 'Atención!',
          text: 'El sustrato no se anulara si no se diligencia un motivo.',
          type: 'warning',
          confirmButtonColor: '#15d4be',
        });
      }
    });
  }
}