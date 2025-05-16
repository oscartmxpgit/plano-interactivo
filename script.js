const svg = document.getElementById("plano");
const tooltip = document.getElementById("tooltip");
const lista = document.getElementById("lista-areas");
const buscador = document.getElementById("buscador");

fetch("areas.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(area => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", area.x);
      rect.setAttribute("y", area.y);
      rect.setAttribute("width", area.width);
      rect.setAttribute("height", area.height);
      rect.setAttribute("fill", area.fill);
      rect.setAttribute("class", "habitacion");
      rect.setAttribute("id", area.id);

      rect.addEventListener("mousemove", e => {
        tooltip.classList.remove("oculto");
        tooltip.innerText = area.descripcion;
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 10 + "px";
      });

      rect.addEventListener("mouseout", () => {
        tooltip.classList.add("oculto");
      });

      svg.appendChild(rect);

      if (area.esVerde) {
        for (let i = 0; i < 4; i++) {
          const tree = document.createElementNS("http://www.w3.org/2000/svg", "image");
          tree.setAttribute("href", "assets/tree.svg");
          tree.setAttribute("x", area.x + 10 + i * 30);
          tree.setAttribute("y", area.y + 10);
          tree.setAttribute("width", 20);
          tree.setAttribute("height", 20);
          svg.appendChild(tree);
        }
      }

      const li = document.createElement("li");
      li.textContent = area.nombre;
      li.addEventListener("click", () => {
        svg.setAttribute("viewBox", `${area.x - 50} ${area.y - 50} 300 200`);
      });
      lista.appendChild(li);
    });
  });

// Buscador
buscador.addEventListener("input", () => {
  const query = buscador.value.toLowerCase();
  Array.from(lista.children).forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(query) ? "" : "none";
  });
});

// Zoom con la rueda del ratón
let zoom = 1;
svg.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoom += e.deltaY * -0.001;
  zoom = Math.min(Math.max(0.5, zoom), 3);
  svg.setAttribute("style", `transform: scale(${zoom})`);
});

// Navegación con teclado
window.addEventListener("keydown", e => {
  const viewBox = svg.getAttribute("viewBox").split(" ").map(Number);
  switch (e.key) {
    case "ArrowUp": viewBox[1] -= 20; break;
    case "ArrowDown": viewBox[1] += 20; break;
    case "ArrowLeft": viewBox[0] -= 20; break;
    case "ArrowRight": viewBox[0] += 20; break;
  }
  svg.setAttribute("viewBox", viewBox.join(" "));
});
