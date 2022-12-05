var app = new Vue({
    el: '#clienteUpdate',
    data: {
        cliente: {},
        clienteSucursal: "",
        sucursales: [],
  
    },
    mounted: async function () {
        await this.getSucursales();
        await this.getClienteData();
        await this.setData();
    
    },
    methods: {
        sendData: function () {
            const cliente =  {...this.cliente}
      
            fetch("/cliente/", {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            }).then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            icon: 'success',
                            title: 'OK',
                            text: "cliente actualizado correctamente"
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
        getClienteData: function () {
            fetch("/cliente/get/" + this.getClienteId(), {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    this.setData();
                    this.cliente = response.data
          
                });
        },
        getClienteId: function () {
            return document.getElementById("clienteId").value;
        },
        getSucursales: function () {
            fetch("/empresa/all", {
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
                    this.getClienteData();
                });
        },
        setData: function() {
            this.clienteSucursal = this.cliente.idempresa
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
                            text: "cliente actualizado correctamente"
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