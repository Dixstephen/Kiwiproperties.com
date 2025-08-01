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
