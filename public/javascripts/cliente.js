const clienteToRegisterModel = {
  name : "",
  direccion : "",
  rfc : "",
  contacto_persona:"",
  puesto:"",
  phoneNumber: "",
  email : "",
  feccap : "",
  idestatus:""
}
const sucursalToRegisterModel = {
  clienteId : "",
  name : "",
  ubicacion : ""
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
async function getClientes() {
  let data = await fetch("/cliente/all", {
    method: "GET",
    credentials: "same-origin",
    headers: { "Content-Type" : "application/json" }
  });
  data = await data.json();
  return data;
}
async function registrarCliente(bodyData) {
  console.log(bodyData);
  let response = await fetch("/cliente", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(bodyData),
  });
  response = await response.json();
  console.log(response);
  errorHandler(response, "cliente registrado correctamente")
}
async function registrarSucursal(bodyData) {
  let response = await fetch("/cliente/sucursal", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(bodyData),
  });
  console.log(response);
  response = await response.json();
  errorHandler(response, "Sucursal registrada correctamente");
}
var app = new Vue({
  el: '#clienteRegister',
  data: {
    clienteModel : {...clienteToRegisterModel},
    sucursalModel: {...sucursalToRegisterModel},
    clientes: []
},
  mounted() { 
    this.setData();
  },
  methods: {
    test() {
      console.log(this.$data);
    },
    async registrarCliente() {
      await registrarCliente(this.$data.clienteModel);
      this.clienteModel = {...clienteToRegisterModel};
    },
    async registrarSucursal() {
      await registrarSucursal(this.$data.sucursalModel);
      this.clientes = {...sucursalToRegisterModel};
      await this.setData();
    },
    async setData() {
      this.clientes = await getClientes();
      this.sucursalModel.clienteId = this.clientes[0].clienteId
    }
  }
});