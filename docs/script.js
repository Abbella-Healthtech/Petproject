const form = document.getElementById("petForm");
const petList = document.getElementById("petList");

let currentUser = null;

// 👤 Display logged-in user info and setup logout
function showUserInfo(user) {
  const info = document.createElement("p");
  info.textContent = `Logged in as: ${user.email}`;
  document.body.prepend(info);

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.onclick = logout;
  document.body.prepend(logoutBtn);
}

// 🔄 Fetch pets from Supabase for the logged-in user
async function renderPets() {
  if (!currentUser) {
    alert("Please log in to view your pets.");
    return;
  }

  const { data: pets, error } = await supabase
    .from("pets")
    .select("*")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    alert("Failed to load pets: " + error.message);
    return;
  }

  petList.innerHTML = "";
  pets.forEach((pet) => {
    const li = document.createElement("li");
    li.textContent = `${pet.name} (${pet.type})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = async () => {
      await supabase.from("pets").delete().eq("id", pet.id);
      renderPets();
    };

    li.appendChild(deleteBtn);
    petList.appendChild(li);
  });
}

// ➕ Add new pet to Supabase
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("petName").value;
  const type = document.getElementById("petType").value;

  if (name && type && currentUser) {
    const { error } = await supabase.from("pets").insert([
      { name, type, user_id: currentUser.id }
    ]);

    if (error) {
      alert("Error adding pet: " + error.message);
    } else {
      renderPets();
      form.reset();
    }
  }
});

// 🔐 Logout handler
async function logout() {
  await supabase.auth.signOut();
  alert("You have been logged out.");
  window.location.reload();
}

// 👤 Load user and render pets
supabase.auth.getUser().then(({ data: { user } }) => {
  if (user) {
    currentUser = user;
    showUserInfo(user);
    renderPets();
  }
});
