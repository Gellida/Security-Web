var app = new Vue({
    el: '#servicioRegister',
    data: {
        cotizacionid: "",
        modalidad: "Básico",
        tiempo_servicio: "",
        cantidad_servicio: "",
        costo_servicio: "",
        cantidad_elementos: "",
        descripcion: "",           
        idestatus: 1,
        servicios : []
    },
    mounted : function () {
        this.getData();
    },
    methods: {
        sendData: function () {
            fetch("/servicio", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.$data),
            }).then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    console.log(response);
                    if(response.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.error,
                          });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'OK',
                            text: "Servicio registrado correctamente"
                        });
                        this.cotizacionid = "";
                        this.modalidad = "";
                        this.tiempo_servicio = "";
                        this.cantidad_servicio = "";
                        this.costo_servicio = "";
                        this.cantidad_elementos = "";
                        this.descripcion = "";  
                        this.getData()
                    }
                });
        },
        getData() {
            fetch("/servicio/all", {
              method: "GET",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              }
            }).then((res) => res.json())
              .catch((error) => console.error("Error:", error))
              .then((response) => this.servicios = response.data);
          },
    }
});