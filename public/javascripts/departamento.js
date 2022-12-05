var app = new Vue({
  el: "#VueEmpresa",
  data: {
    nombre: "",
    rfc: "",
    telefono: "",
    domicilio: "",
    departamentos: [],
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    sendData() {
      console.log("send data")
      fetch("/departamento", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.$data),
      }).then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.error,
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: "Departamento registrado correctamente"
            });
            this.nombre = "";
            this.rfc = "";
            this.telefono = "";
            this.domicilio = "";
            this.getData();
          }
        });
    },
    getData() {
      console.log("get data");
      fetch("/departamento/all", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => this.departamentos = response);
    },
  }
});