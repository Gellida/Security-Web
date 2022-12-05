var app = new Vue({
  el: "#empresaUpdate",
  data: {
    empresaSucursal: "",
    empresa: {},
  },
  mounted: async function () {
    await this.getEmpresas();
    await console.log(this);
  },
  methods: {
    sendData: function () {
      const empresa =  {...this.empresa}
      console.log("empresajs:",empresa);
      fetch("/empresa/", {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empresa),
      }).then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          console.log(empresa);
          if (!response.error) {
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: "Empresa actualizada correctamente"
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
    
    getEmpresas: function () {
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
          this.empresa = response[0]
          this.empresa.regimenfiscal ??= 1;
        });
    },
  
    
    getEmpresaId: function () {
      return document.getElementById("idempresa").value;
  },
  }
});