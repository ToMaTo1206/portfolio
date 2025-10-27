const btn = document.getElementById("btn-mode");
const p_mode = document.getElementById("p-mode");

function textContent(){
    if (document.body.classList.contains("jour")) {
        p_mode.textContent = "Nuit";
        document.body.classList.remove("jour");
        document.body.classList.toggle("nuit");
    } else if (document.body.classList.contains("nuit")) {
        p_mode.textContent = "Jour";
        document.body.classList.remove("nuit");
        document.body.classList.toggle("jour");
};
}


btn.addEventListener("click", () => {
    textContent();

});