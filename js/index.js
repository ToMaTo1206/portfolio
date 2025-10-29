const btn = document.getElementById("btn-mode");
const p_mode = document.getElementById("p-mode");
const mark = document.getElementById("mark")
console.log(mark)

function textContent(){
    if (document.body.classList.contains("jour")) {
        p_mode.textContent = "Nuit";
        document.body.classList.remove("jour");
        document.body.classList.toggle("nuit");
        mark.classList.remove("surligne-jour");
        mark.classList.toggle("surligne-nuit");
    } else if (document.body.classList.contains("nuit")) {
        p_mode.textContent = "Jour";
        document.body.classList.remove("nuit");
        document.body.classList.toggle("jour");
        mark.classList.remove("surligne-nuit");
        mark.classList.toggle("surligne-jour");
};
}


btn.addEventListener("click", () => {
    textContent();

});