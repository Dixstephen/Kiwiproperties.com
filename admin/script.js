import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://YOUR_PROJECT_URL.supabase.co", // 🔁 replace this
  "YOUR_PUBLIC_ANON_KEY"                  // 🔁 replace this
);

const form = document.getElementById("uploadForm");
const propertyList = document.getElementById("propertyList");

async function loadProperties() {
  const { data, error } = await supabase.from("properties").select("*");
  if (error) console.error(error);
  else renderProperties(data);
}

function renderProperties(properties) {
  propertyList.innerHTML = "";
  properties.forEach((p) => {
    propertyList.innerHTML += `
      <div class="bg-white rounded p-4 shadow space-y-2">
        <img src="${p.image_url}" class="w-full h-40 object-cover rounded" />
        <h3 class="text-xl font-semibold text-blue-700">${p.title}</h3>
        <p>${p.description}</p>
        <p class="text-green-700 font-bold">$${parseFloat(p.price).toLocaleString()}</p>
      </div>
    `;
  });
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = document.getElementById("price").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();

  if (!title || !description || !price || !imageUrl) return;

  const { error } = await supabase.from("properties").insert([
    { title, description, price: parseFloat(price), image_url: imageUrl },
  ]);

  if (error) {
    console.error(error);
    alert("Upload failed.");
  } else {
    form.reset();
    loadProperties();
  }
});

loadProperties();
