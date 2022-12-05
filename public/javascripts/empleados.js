var app = new Vue({
    el: '#empleadosView',
    data: {
        empleados: [],
    },
    mounted: function () {
        console.log("hola")
        this.getEmpleados();
    },
    methods: {
        getEmpleados: function () {
            fetch("/empleado/all", {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.empleados = response;
            });
        },
        despedir: function(id, indexList) {
            Swal.fire({
                title: 'Actualizar estado del empleado a inactivo',
                text: "¿Está de acuerdo con dar de baja a "+this.empleados[indexList].name+" "+this.empleados[indexList].fatherLastName+" "+this.empleados[indexList].motherLastName+"?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) this.dellEmpleado(id);
            });
        },
        dellEmpleado: function(id) {
            fetch("../empleado", {
                method: "DELETE",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    empleadoId: id,
                })
            }).then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                if(response.error) Swal.fire({
                    title: 'Oops...',
                    text: response.error,
                    icon: 'error',
                });
                else {
                    this.getEmpleados()
                    Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: "Empleado despedido correctamente"
                    });
                };
            });
        }
    }
});