const form = document.getElementById("petForm");
const petList = document.getElementById("petList");

function getSavedPets() {
  const pets = localStorage.getItem("pets");
  return pets ? JSON.parse(pets) : [];
}

function savePets(pets) {
  localStorage.setItem("pets", JSON.stringify(pets));
}

function renderPets() {
  const pets = getSavedPets();
  petList.innerHTML = "";

  pets.forEach((pet, index) => {
    const li = document.createElement("li");
    li.textContent = `${pet.name} (${pet.type}) `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => {
      pets.splice(index, 1);
      savePets(pets);
      renderPets();
    };

    li.appendChild(deleteBtn);
    petList.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("petName").value;
  const type = document.getElementById("petType").value;

  if (name && type) {
    const pets = getSavedPets();
    pets.push({ name, type });
    savePets(pets);
    renderPets();
    form.reset();
  }
});

renderPets();
