const socket = io();

const prodContainer = document.getElementById("products-container");

socket.emit("load");

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
