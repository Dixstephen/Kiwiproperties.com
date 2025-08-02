// Login Logic
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "admin@kiwiproperties.org" && password === "pass1234") {
    localStorage.setItem("auth", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error-msg").innerText = "Invalid login!";
  }
}

// Property Upload Logic
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("uploadForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const location = document.getElementById("location").value;
      const price = document.getElementById("price").value;
      const description = document.getElementById("description").value;
      const image = document.getElementById("image").files[0];

      const reader = new FileReader();
      reader.onloadend = function () {
        const property = {
          title,
          location,
          price,
          description,
          image: reader.result,
        };

        let listings = JSON.parse(localStorage.getItem("properties")) || [];
        listings.push(property);
        localStorage.setItem("properties", JSON.stringify(listings));

        document.getElementById("success-msg").innerText = "Property uploaded!";
        form.reset();
      };

      if (image) {
        reader.readAsDataURL(image);
      }
    });
  }
});
