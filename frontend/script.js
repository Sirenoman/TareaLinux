const API_URL = "http://20.64.243.174:5000/api/presentaciones";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("presentation-form");
  const tableBody = document.getElementById("presentation-table");

  // Cargar datos iniciales
  fetchPresentations();

  // Enviar formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const numero = document.getElementById("numero").value;
    const presentante = document.getElementById("presentante").value;
    const servicio = document.getElementById("servicio").value;
    const departamento = document.getElementById("departamento").value;

    const data = { NUMERO_PRESENTACION: numero, PRESENTANTE: presentante, SERVICIO: servicio, DEPARTAMENTO: departamento };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        fetchPresentations();
      }
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  });

  // Cargar presentaciones
  async function fetchPresentations() {
    try {
      const res = await fetch(API_URL);
      const presentations = await res.json();

      tableBody.innerHTML = "";
      presentations.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.NUMERO_PRESENTACION}</td>
          <td>${p.PRESENTANTE}</td>
          <td>${p.SERVICIO}</td>
          <td>${p.DEPARTAMENTO}</td>
          <td>
            <button class="edit" data-id="${p._id}">Editar</button>
            <button class="delete" data-id="${p._id}">Eliminar</button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      addEventListeners();
    } catch (err) {
      console.error("Error al cargar presentaciones:", err);
    }
  }

  // Eventos para editar/eliminar
  function addEventListeners() {
    const editButtons = document.querySelectorAll(".edit");
    const deleteButtons = document.querySelectorAll(".delete");

    editButtons.forEach((btn) => {
      btn.addEventListener("click", handleEdit);
    });

    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", handleDelete);
    });
  }

  // Editar
  async function handleEdit(e) {
    const id = e.target.dataset.id;
    const res = await fetch(`${API_URL}/${id}`);
    const presentation = await res.json();

    document.getElementById("numero").value = presentation.NUMERO_PRESENTACION;
    document.getElementById("presentante").value = presentation.PRESENTANTE;
    document.getElementById("servicio").value = presentation.SERVICIO;
    document.getElementById("departamento").value = presentation.DEPARTAMENTO;
  }

  // Eliminar
  async function handleDelete(e) {
    const id = e.target.dataset.id;
    if (confirm("¿Estás seguro de eliminar esta presentación?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (res.ok) fetchPresentations();
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  }
});