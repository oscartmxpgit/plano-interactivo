fetch('plano.json')
  .then(res => res.json())
  .then(data => renderPlano(data));

const svg = document.getElementById("plano");

function renderPlano(areas) {
  areas.forEach(area => {
    // Crear la habitación
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("id", area.id);
    rect.setAttribute("class", "habitacion");
    rect.setAttribute("x", area.x);
    rect.setAttribute("y", area.y);
    rect.setAttribute("width", area.width);
    rect.setAttribute("height", area.height);
    rect.setAttribute("fill", area.color || "#ddd");
    svg.appendChild(rect);

    // Etiqueta de texto
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", area.x + area.width / 2);
    label.setAttribute("y", area.y + area.height / 2);
    label.setAttribute("class", "label");
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("dominant-baseline", "central");
    label.textContent = area.nombre;
    svg.appendChild(label);

    // Evento click
    rect.addEventListener("click", () => enfocar(area));
  });

  // Dobleclic para vista general
  svg.addEventListener("dblclick", () => {
    svg.setAttribute("viewBox", "0 0 1000 800");
  });
}

function enfocar(area) {
  const padding = 20;
  const x = area.x - padding;
  const y = area.y - padding;
  const w = area.width + padding * 2;
  const h = area.height + padding * 2;
  svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
}
