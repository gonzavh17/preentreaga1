const form = document.getElementById("formLogin");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataForm = new FormData(form);

  const obj = {};

  dataForm.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((response) => {
      console.log("Server Response:", response);
      if (response.payload && response.payload._id) {
        window.location.replace("/static/home");
      } else {
        console.error("Login failed");
      }
    })
    .catch((error) => {
      console.error("Fetch Error:", error);

    });
});