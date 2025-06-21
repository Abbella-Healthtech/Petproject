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
  pets.forEach((pet) => {
    const li = document.createElement("li");
    li.textContent = `${pet.name} (${pet.type})`;
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
