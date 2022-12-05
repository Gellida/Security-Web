document.getElementById("login-btn").addEventListener("click", () => {
  const userName = document.getElementById("login-user-name").value;
  const password = document.getElementById("login-password").value;
  const bodyRequest = {
    userName: userName,
    pass: password,
  };
  console.log("before to fetch")
  fetch("/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyRequest),
  })
  .then((res) => {
    console.log(res)
    return res.json()
  })
  .catch((error) => console.error("Error:", error))
  .then((response) => {
    if (!response.error) {
      window.location.href="/dashboard";
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.error,
      });
    }
  });
});
