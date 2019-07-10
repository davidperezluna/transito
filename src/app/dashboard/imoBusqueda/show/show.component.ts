import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ImoInsumoService } from '../../../services/imoInsumo.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { environment } from 'environments/environment';
declare var $: any;

@Component({
  selector: 'app-show',
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
    console.log(this.loteInsumo);

    let timeoutId = setTimeout(() => {  
      this.onInitTable();
    }, 200);
  }

  onInitTable(){
     // Setup - add a text input to each footer cell
     $('#dataTables-example-sustratos thead th.filter').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" class="form-control" placeholder="'+title+'" />' );
    } );

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

  onDeleteInsumo(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se dañara el sustrato este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.table.destroy();
        this.insumos = null;
        let token = this._LoginService.getToken();
        this._ImoInsumoService.delete(token,id).subscribe(
          response => {
          swal({
            title: 'Perfecto!',
            text: 'Sustrato anulado con éxito.',
            type: 'success',
            confirmButtonColor: '#15d4be',
          })

          this._ImoInsumoService.showLote(this.loteInsumo.id, token).subscribe(
            response => {
              if(response.status == 'success'){
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
      }
    });
  }
}