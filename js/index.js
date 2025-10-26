const btn = document.getElementById("btn-mode");

btn.addEventListener("click", () => {
    if (document.body.classList.contains("jour")) {
        document.body.classList.remove("jour");
        document.body.classList.toggle("nuit");
    } else if (document.body.classList.contains("nuit")) {
        document.body.classList.remove("nuit");
        document.body.classList.toggle("jour");
}});
