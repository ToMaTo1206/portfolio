const btn = document.getElementById("btn-mode");
const p_mode = document.getElementById("p-mode");
const mark = document.getElementById("mark");
const proj1 = document.getElementById("proj1");
const proj2 = document.getElementById("proj2");
const proj3 = document.getElementById("proj3");

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



















document.addEventListener("DOMContentLoaded", function() {
    const elementsToAnimate = document.querySelectorAll(".hidden-left, .hidden-right, .hidden-middle");
    const observer = new IntersectionObserver((entries) => {
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});