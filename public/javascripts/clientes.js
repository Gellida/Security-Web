var app = new Vue({
    el: '#clientesView',
    data: {
        clientes: [],
    },
    mounted: function () {
        this.getClientes();
    },
    methods: {
        getClientes: function () {
            fetch("/cliente/all", {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.clientes = response;
            });
        },
        despedir: function(id, indexList) {
            Swal.fire({
                title: 'Despedir cliente',
                text: "Está de acuerdo con despedir a "+this.clientes[indexList].name+" "+this.clientes[indexList].fatherLastName+" "+this.clientes[indexList].motherLastName,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Despedirlo!'
            }).then((result) => {
                if (result.isConfirmed) this.dellCliente(id);
            });
        },
        dellCliente: function(id) {
            fetch("../cliente", {
                method: "DELETE",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clienteId: id,
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
                    this.getClientes()
                    Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: "cliente despedido correctamente"
                    });
                };
            });
        }
    }
});