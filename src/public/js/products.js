
const form = document.getElementById("formLogin");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dataForm = new FormData(form);

  const obj = {};

  dataForm.forEach((value, key) => (obj[key] = value));
  try {
    const response = await fetch("/api/sessions/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log("Server Response:", data);

    if (data.payload && data.payload._id) {
      alert("Loguing exitoso")
      window.location.replace("/static/home");
    } else {
      alert("Error en el logueo")
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("error en el logueo")
  }
});
