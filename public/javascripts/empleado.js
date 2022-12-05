var app = new Vue({
  el: '#empleadoRegister',
  data: {
    empleadoId: "",
    userName: "",
    name: "",
    fatherLastName: "",
    motherLastName: "",
    rfc: "",
    numeroSeguroSocial: "",
    email: "",
    phoneNumber: "",
    password: "",
    fechaContratacion: "",
    fechaNacimiento: "",
    status: 1,
    permisos: 7,
    curp: "",
    sexo: "H",
    estadoCivil: "Soltero",
    sucursal: "",
    sucursales: []
  },
  mounted: function () {
    this.getSucursales();
  },
  methods: {
    sendData: function () {
      fetch("/empleado", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.$data),
      }).then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (!response.error) {
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: "Empleado registrado correctamente"
            });
            this.empleadoId = "";
            this.userName = "";
            this.name = "";
            this.fatherLastName = "";
            this.motherLastName = "";
            this.rfc = "";
            this.numeroSeguroSocial = "";
            this.email = "";
            this.phoneNumber = "";
            this.password = "";
            this.fechaContratacion = "";
            this.fechaNacimiento = "";
            this.status = 1;
            this.permisos = 7;
            this.curp = "";
            this.sexo = "H";
            this.estadoCivil = "Soltero";
            this.sucursal = this.sucursales[0].idempresa;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.error,
            });
          }
        });
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
          console.log(response);
          this.sucursales = response
          if (this.sucursal == "") this.sucursal = this.sucursales[0].iddepartamento;
        });
    }
  }
});