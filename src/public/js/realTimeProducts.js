const socket = io();

const form = document.getElementById("formProduct");
const prodContainer = document.getElementById("products-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataForm = new FormData(e.target);
  const product = Object.fromEntries(dataForm);
  Swal.fire({
    title: "Producto creado",
  });
  socket.emit("newProduct", product);
  e.target.reset();
});

socket.on("products", (products) => {
  prodContainer.innerHTML = "";
  products.forEach((prod) => {
    prodContainer.innerHTML += `
      <p>Title: ${prod.title}</p>
      <p>Description: ${prod.description}</p>
      <p>Price: ${prod.price}</p>
      <p>Status: ${prod.status}</p>
      <p>Code: ${prod.code}</p>
      <p>Stock: ${prod.stock}</p>
    `;
  });
});
