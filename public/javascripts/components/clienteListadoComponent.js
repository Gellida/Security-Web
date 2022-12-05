Vue.component("cliente-select", {
  name: "cliente-select",
  data() {
    return {
      clientes: [],
      indexClienteSelected: 0,
    }
  },
  mounted() {
    this.getClienteData();
  },
  methods: {
    getClienteData() {
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
  },
  computed: {
    clienteSelected() {
      return this.clientes;
    }
  }
}) 