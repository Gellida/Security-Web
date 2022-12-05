function saveChange(data) {
    console.log(data);
    fetch("/cotizacion/"+data.cotizacionId+"", {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
        if (response.error) Swal.fire({
            title: 'Oops...',
            text: response.error,
            icon: 'error',
        });
        else {
            Swal.fire({
                icon: 'success',
                title: 'Cotizacion actualizada',
                text: "Su cotización se ha actualizado correctamente"
            }).then(() => window.location.href="/cotizacion/pendientes");
        };
    });
}

Vue.component("servicio-edit", {
    name: "servicio-edit",
    props: {
        servicioId: "",
        precioCotizado: "",
        cantidadDeServicios: "",
    },
    data() {
        return {
            id: "",
            precio: "",
            cantidad: "",
            acvtive: true
        };
    },
    mounted() {
        this.acvtive = true
        this.id = this.servicioId;
        this.precio = this.precioCotizado;
        this.cantidad = this.cantidadDeServicios;
        console.log(this.$data);
    },
    methods: {
        servicioActualizado() {
            this.$emit("servicio-actualizado", this.id, this.precio, this.cantidad);
        },
        servicioCancelado(){
            this.$emit("servicio-cancelado", this.id);
            this.acvtive = false
            console.log(this)
        },
        servicioRestaurado() {
            this.$emit("servicio-restaurado", this.id);
            this.acvtive = true
            console.log(this)
        }
    },
    watch: {
        precio: function () {
            this.servicioActualizado();
        },
        cantidad: function () {
            this.servicioActualizado();
        }
    }
})

var app = new Vue({
    el: "#cotizacion_editar",
    data: {
        cotizacionId: "",
        servicios: [],
        serviciosCancelados: []
    },
    mounted() {
        this.cotizacionId = document.getElementById("cotizacionId").value;
    },
    methods: {
        async guardar() {
            const result = await Swal.fire({
                title: '¿Está seguro de actualizar esta cotización?',
                showDenyButton: true,
                confirmButtonText: 'Actualizar cotización',
                denyButtonText: 'Cancelar',
            })
            if(result.isConfirmed) saveChange({
                cotizacionId: this.cotizacionId,
                serviciosIds : this.servicios,
                serviciosCanceladosIds : this.serviciosCancelados
            })
        },
        actualizarServicios(servicioId, precioCotizado, cantidadDeServicios) {
            const services = this.servicios.find(servicio => servicio.servicioId == servicioId);
            if (!services) this.servicios.push({
                servicioId,
                precioCotizado,
                cantidadDeServicios
            })
            else {
                services.precioCotizado = precioCotizado;
                services.cantidadDeServicios = cantidadDeServicios;
            }
        },
        cancelarServicio(servicioId) {
            const services = this.serviciosCancelados.find(servicioid => servicioid == servicioId);
            if(!services) this.serviciosCancelados.push(servicioId);
        },
        restaurarServicio(servicioId) {
            this.serviciosCancelados = this.serviciosCancelados.filter(servicioid => servicioid != servicioId)
        }
    }
})