async function getClientes() {
    let data = await fetch("/cliente/all", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" }
    });
    data = await data.json();
    return data;
}
async function getSucursalesByCliente(idCliente) {
    let data = await fetch("/cliente/" + idCliente + "/sucursales", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" }
    });
    data = await data.json();
    return data;
}
async function getServicios() {
    let data = await fetch("/servicio/all", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" }
    });
    data = await data.json();
    return data;
}
function errorHandler(response, SuccessMesage) {
    if (response.error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.error,
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'OK',
            text: SuccessMesage
        });
    }
}
function parsseData(data) {
    const body = {
        clienteId: data.clineteIdSelected,
        sucursalId: data.sucursalIdSelected,
        serviciosIds: data.serviciosSeleccionados.map(servicio => {
            return {
                servicioId: servicio.servicioId,
                cantidadDeServicios: 1
            }
        }).reduce((listadoFinal, servicio) => {
            let servicioListado = listadoFinal.find((inList) => inList.servicioId == servicio.servicioId);
            if (!servicioListado) return [servicio, ...listadoFinal];
            servicioListado.cantidadDeServicios += 1;
            return listadoFinal;
        }, [])
    }
    return body;
}
async function registrarCotizacion(bodyData) {
    console.log(bodyData);
    let response = await fetch("/cotizacion", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(bodyData),
    });
    response = await response.json();
    console.log(response);
    errorHandler(response, "Cotización registrada correctamente")
  }
async function guardarCotizacion(data) {
    let cotizacion = parsseData(data);
    await registrarCotizacion(cotizacion);
}

var app = new Vue({
    el: "#cotizacion",
    data: {
        clineteIdSelected: "",
        sucursalIdSelected: "",
        servicioSelected: "",
        clientes: [],
        sucursales: [],
        servicios: [],
        servicioToAdd: {
            modalidad: "",
            tiempo_servicio: "",
            costo_servicio: "",
            cantidad_elementos: "",
            descripcion: ""
        },
        serviciosSeleccionados: [],
    },
    mounted: async function () {
        const clientes = await getClientes();
        const sucursales = await getSucursalesByCliente(clientes[0].clienteId);
        const servicios = await getServicios();
        this.clientes = clientes;
        this.sucursales = sucursales.data;
        this.servicios = servicios.data;
        this.clineteIdSelected = clientes[0].clienteId;
        this.sucursalIdSelected = sucursales.data[0].sucursalId;
        this.servicioSelected = servicios.data[0].servicioId;
        this.servicioToAdd = servicios.data[0]

    },
    methods: {
        test() {
            console.log(this.$data);
        },
        addServices() {
            const servicio = this.serviciosSeleccionados.find((servicio) => {
                return servicio.servicioId == this.servicioToAdd.servicioId;
            })
            if(!servicio) this.serviciosSeleccionados.push({
                cantidadDeServicios: 1,
                ...this.servicioToAdd 
            });
            else {
                servicio.cantidadDeServicios += 1;
            }
        },
        remove(index) {
            const servicio = this.serviciosSeleccionados[index];
            if(servicio.cantidadDeServicios > 1) servicio.cantidadDeServicios += -1
            else this.serviciosSeleccionados.splice(index, 1);
        },
        async guardar() {
            await guardarCotizacion(this.$data)
            this.serviciosSeleccionados = [];
        }
    },
    computed: {
        subTotal() {
            let acumulado = 0;
            for (let indice in this.serviciosSeleccionados) {
                const costo = this.serviciosSeleccionados[indice]?.costo_servicio ?? 0;
                const cantidad = this.serviciosSeleccionados[indice]?.cantidadDeServicios;
                acumulado += parseFloat(costo) * cantidad
            }
            return acumulado;
        }
    },
    watch: {
        async clineteIdSelected(val) {
            const sucursales = await getSucursalesByCliente(val);
            this.sucursales = sucursales.data
            this.sucursalIdSelected = sucursales.data[0].sucursalId;
        },
        servicioSelected(val) {
            this.servicioToAdd = this.servicios.find((servicio) => servicio.servicioId == val)
        }
    }
});