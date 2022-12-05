var app = new Vue({
    el: '#empleadoUpdate',
    data: {
        empleado: {},
        empleadoSucursal: "",
        sucursales: [],
        newPassword: "",
    },
    mounted: async function () {
        await this.getSucursales();
        await this.getEmpleadoData();
        await this.setData();
    },
    methods: {
        sendData: function () {
            const empleado =  {...this.empleado}
            empleado.idempresa = this.empleadoSucursal
   
            fetch("/empleado/", {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(empleado),
            }).then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            icon: 'success',
                            title: 'OK',
                            text: "Empleado actualizado correctamente"
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.error,
                        });
                    }
                });
        },
        getEmpleadoData: function () {
            fetch("/empleado/get/" + this.getEmpleadoId(), {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    this.setData();
                    this.empleado = response.data
                });
        },
        getEmpleadoId: function () {
            return document.getElementById("empleadoId").value;
        },
        getSucursales: function () {
            fetch("/departamento/all", {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => {
                return res.json();
            })
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    this.sucursales = response
                    this.getEmpleadoData();
                });
        },
        setData: function() {
            
            this.empleadoSucursal = this.empleado.idempresa
        },

        sendNewPass: function() {
            fetch("/new_password", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    
                }),
            }).then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            icon: 'success',
                            title: 'OK',
                            text: "Empleado actualizado correctamente"
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.error,
                        });
                    }
                });
        }
    }
});