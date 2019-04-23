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
public apiUrl = environment.apiUrl + 'insumo/imolote';
public errorMessage;
public respuesta;
public table:any;

constructor(
  private _loginService: LoginService,
  private _ImoInsumoService: ImoInsumoService,
  ){}

  ngOnInit() {
    let timeoutId = setTimeout(() => {  
      this.iniciarTabla();
    }, 100);
  }
  iniciarTabla(){
     // Setup - add a text input to each footer cell
     $('#dataTables-example-Sustratos thead th.filter').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" class="form-control" placeholder="'+title+'" />' );
    } );

    $('#dataTables-example-Sustratos').DataTable({
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
    this.table = $('#dataTables-example-Sustratos').DataTable();
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

  deleteInsumo(id:any){

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
        let token = this._loginService.getToken();
        this._ImoInsumoService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Modificado!',
                      text:'Registro modificado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })

                    this._ImoInsumoService.showLote(this.loteInsumo.id,token).subscribe(
                      response => {
                        this.respuesta = response;
                        if(this.respuesta.status == 'success'){
                          this.insumos = this.respuesta.datos;
                          this.respuesta= response;
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
    })
  }
}