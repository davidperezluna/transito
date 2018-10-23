"use strict";
var MsvRegistroIpat = (function () {
    function MsvRegistroIpat(
        /*public fechaRadicacion:string,
        public municipioId:number,
        public ciudadanoDemandadoId:number,
        public ciudadanoDemandanteId:number,*/
        idSedeOperativa, idGravedad, lugar, fechaAccidente, fechaLevantamiento, idClaseAccidente, otroClaseAccidente, idChoqueCon, idObjetoFijo, otroObjetoFijo, idArea, idSector, idZona, idDisenio, idEstadoTiempo, idGeometria, idUtilizacion, idCalzada, idCarril, idMaterial, idEstadoVia, idCondicionVia, idIluminacion, idEstadoIluminacion, idVisual, idVisualDisminuida, 
        //campos vehiculo
        placa, placaRemolque, nacionalidadVehiculo, marca, linea, color, modelo, carroceria, ton, pasajeros, numeroLicenciaTransito, empresa, nitEmpresa, matriculadoEn, inmovilizadoEn, aDisposicionDe, tarjetaRegistro, 
        //revision tecnomecanica
        revisionTecnomecanica, numeroTecnoMecanica, cantidadAcompaniantes, 
        //soat
        portaSoat, soat, numeroPoliza, aseguradoraSoat, fechaVencimientoSoat, 
        //seguro de responsabilidad civil contractual
        portaSeguroResponsabilidadCivil, numeroSeguroResponsabilidadCivil, idAseguradoraSeguroResponsabilidadCivil, fechaVencimientoSeguroResponsabilidadCivil, 
        //seguro de responsabilidad extracontractual
        portaSeguroExtracontractual, numeroSeguroExtracontractual, idAseguradoraSeguroExtracontractual, fechaVencimientoSeguroExtracontractual, 
        //propietario
        mismoConductor, nombresPropietario, apellidosPropietario, tipoIdentificacionPropietario, identificacionPropietario, clase, servicio, modalidadTransporte, radioAccion, descripcionDanios, idFalla, idLugarImpacto, 
        //Datos Conductor
        nombresConductor, apellidosConductor, tipoIdentificacionConductor, identificacionConductor, nacionalidadConductor, fechaNacimientoConductor, sexoConductor, gravedadConductor, direccionResidenciaConductor, ciudadResidenciaConductor, telefonoConductor, praticoExamenConductor, autorizoConductor, idResultadoExamenConductor, idGradoExamenConductor, sustanciasPsicoactivasConductor, portaLicencia, numeroLicenciaConduccion, categoriaLicenciaConduccion, restriccionConductor, fechaExpedicionLicenciaConduccion, fechaVencimientoLicenciaConduccion, chalecoConductor, cascoConductor, cinturonConductor, idHospitalConductor, descripcionLesion, 
        //datos victima
        victima, nombresVictima, apellidosVictima, tipoIdentificacionVictima, identificacionVictima, nacionalidadVictima, fechaNacimientoVictima, sexoVictima, direccionResidenciaVictima, ciudadResidenciaVictima, telefonoVictima, idHospitalVictima, praticoExamenVictima, autorizoVictima, idResultadoExamenVictima, idGradoExamenVictima, sustanciasPsicoactivasVictima, chalecoVictima, cascoVictima, cinturonVictima, idTipoVictima, idGravedadVictima, observaciones, 
        // datos de quien conoce el accidente
        gradoTestigo, nombresTestigo, apellidosTestigo, tipoIdentificacionTestigo, identificacionTestigo, placaTestigo, entidadTestigo, idHipotesis) {
        this.idSedeOperativa = idSedeOperativa;
        this.idGravedad = idGravedad;
        this.lugar = lugar;
        this.fechaAccidente = fechaAccidente;
        this.fechaLevantamiento = fechaLevantamiento;
        this.idClaseAccidente = idClaseAccidente;
        this.otroClaseAccidente = otroClaseAccidente;
        this.idChoqueCon = idChoqueCon;
        this.idObjetoFijo = idObjetoFijo;
        this.otroObjetoFijo = otroObjetoFijo;
        this.idArea = idArea;
        this.idSector = idSector;
        this.idZona = idZona;
        this.idDisenio = idDisenio;
        this.idEstadoTiempo = idEstadoTiempo;
        this.idGeometria = idGeometria;
        this.idUtilizacion = idUtilizacion;
        this.idCalzada = idCalzada;
        this.idCarril = idCarril;
        this.idMaterial = idMaterial;
        this.idEstadoVia = idEstadoVia;
        this.idCondicionVia = idCondicionVia;
        this.idIluminacion = idIluminacion;
        this.idEstadoIluminacion = idEstadoIluminacion;
        this.idVisual = idVisual;
        this.idVisualDisminuida = idVisualDisminuida;
        this.placa = placa;
        this.placaRemolque = placaRemolque;
        this.nacionalidadVehiculo = nacionalidadVehiculo;
        this.marca = marca;
        this.linea = linea;
        this.color = color;
        this.modelo = modelo;
        this.carroceria = carroceria;
        this.ton = ton;
        this.pasajeros = pasajeros;
        this.numeroLicenciaTransito = numeroLicenciaTransito;
        this.empresa = empresa;
        this.nitEmpresa = nitEmpresa;
        this.matriculadoEn = matriculadoEn;
        this.inmovilizadoEn = inmovilizadoEn;
        this.aDisposicionDe = aDisposicionDe;
        this.tarjetaRegistro = tarjetaRegistro;
        this.revisionTecnomecanica = revisionTecnomecanica;
        this.numeroTecnoMecanica = numeroTecnoMecanica;
        this.cantidadAcompaniantes = cantidadAcompaniantes;
        this.portaSoat = portaSoat;
        this.soat = soat;
        this.numeroPoliza = numeroPoliza;
        this.aseguradoraSoat = aseguradoraSoat;
        this.fechaVencimientoSoat = fechaVencimientoSoat;
        this.portaSeguroResponsabilidadCivil = portaSeguroResponsabilidadCivil;
        this.numeroSeguroResponsabilidadCivil = numeroSeguroResponsabilidadCivil;
        this.idAseguradoraSeguroResponsabilidadCivil = idAseguradoraSeguroResponsabilidadCivil;
        this.fechaVencimientoSeguroResponsabilidadCivil = fechaVencimientoSeguroResponsabilidadCivil;
        this.portaSeguroExtracontractual = portaSeguroExtracontractual;
        this.numeroSeguroExtracontractual = numeroSeguroExtracontractual;
        this.idAseguradoraSeguroExtracontractual = idAseguradoraSeguroExtracontractual;
        this.fechaVencimientoSeguroExtracontractual = fechaVencimientoSeguroExtracontractual;
        this.mismoConductor = mismoConductor;
        this.nombresPropietario = nombresPropietario;
        this.apellidosPropietario = apellidosPropietario;
        this.tipoIdentificacionPropietario = tipoIdentificacionPropietario;
        this.identificacionPropietario = identificacionPropietario;
        this.clase = clase;
        this.servicio = servicio;
        this.modalidadTransporte = modalidadTransporte;
        this.radioAccion = radioAccion;
        this.descripcionDanios = descripcionDanios;
        this.idFalla = idFalla;
        this.idLugarImpacto = idLugarImpacto;
        this.nombresConductor = nombresConductor;
        this.apellidosConductor = apellidosConductor;
        this.tipoIdentificacionConductor = tipoIdentificacionConductor;
        this.identificacionConductor = identificacionConductor;
        this.nacionalidadConductor = nacionalidadConductor;
        this.fechaNacimientoConductor = fechaNacimientoConductor;
        this.sexoConductor = sexoConductor;
        this.gravedadConductor = gravedadConductor;
        this.direccionResidenciaConductor = direccionResidenciaConductor;
        this.ciudadResidenciaConductor = ciudadResidenciaConductor;
        this.telefonoConductor = telefonoConductor;
        this.praticoExamenConductor = praticoExamenConductor;
        this.autorizoConductor = autorizoConductor;
        this.idResultadoExamenConductor = idResultadoExamenConductor;
        this.idGradoExamenConductor = idGradoExamenConductor;
        this.sustanciasPsicoactivasConductor = sustanciasPsicoactivasConductor;
        this.portaLicencia = portaLicencia;
        this.numeroLicenciaConduccion = numeroLicenciaConduccion;
        this.categoriaLicenciaConduccion = categoriaLicenciaConduccion;
        this.restriccionConductor = restriccionConductor;
        this.fechaExpedicionLicenciaConduccion = fechaExpedicionLicenciaConduccion;
        this.fechaVencimientoLicenciaConduccion = fechaVencimientoLicenciaConduccion;
        this.chalecoConductor = chalecoConductor;
        this.cascoConductor = cascoConductor;
        this.cinturonConductor = cinturonConductor;
        this.idHospitalConductor = idHospitalConductor;
        this.descripcionLesion = descripcionLesion;
        this.victima = victima;
        this.nombresVictima = nombresVictima;
        this.apellidosVictima = apellidosVictima;
        this.tipoIdentificacionVictima = tipoIdentificacionVictima;
        this.identificacionVictima = identificacionVictima;
        this.nacionalidadVictima = nacionalidadVictima;
        this.fechaNacimientoVictima = fechaNacimientoVictima;
        this.sexoVictima = sexoVictima;
        this.direccionResidenciaVictima = direccionResidenciaVictima;
        this.ciudadResidenciaVictima = ciudadResidenciaVictima;
        this.telefonoVictima = telefonoVictima;
        this.idHospitalVictima = idHospitalVictima;
        this.praticoExamenVictima = praticoExamenVictima;
        this.autorizoVictima = autorizoVictima;
        this.idResultadoExamenVictima = idResultadoExamenVictima;
        this.idGradoExamenVictima = idGradoExamenVictima;
        this.sustanciasPsicoactivasVictima = sustanciasPsicoactivasVictima;
        this.chalecoVictima = chalecoVictima;
        this.cascoVictima = cascoVictima;
        this.cinturonVictima = cinturonVictima;
        this.idTipoVictima = idTipoVictima;
        this.idGravedadVictima = idGravedadVictima;
        this.observaciones = observaciones;
        this.gradoTestigo = gradoTestigo;
        this.nombresTestigo = nombresTestigo;
        this.apellidosTestigo = apellidosTestigo;
        this.tipoIdentificacionTestigo = tipoIdentificacionTestigo;
        this.identificacionTestigo = identificacionTestigo;
        this.placaTestigo = placaTestigo;
        this.entidadTestigo = entidadTestigo;
        this.idHipotesis = idHipotesis;
    }
    return MsvRegistroIpat;
}());
exports.MsvRegistroIpat = MsvRegistroIpat;
//# sourceMappingURL=msvRegistroIpat.modelo.js.map