const btn = document.getElementById("btn-mode");
const mark = document.getElementById("mark");
const iconMode = document.getElementById('icon-mode');

function textContent(){
    if (document.body.classList.contains("jour")) {
        iconMode.alt = "Passer au mode nuit";
        iconMode.src = "img/sun.svg";
        document.body.classList.remove("jour");
        document.body.classList.toggle("nuit");
        mark.classList.remove("surligne-jour");
        mark.classList.toggle("surligne-nuit");
    } else if (document.body.classList.contains("nuit")) {
        iconMode.alt = "Passer au mode jour";
        iconMode.src = "img/moon.svg";
        document.body.classList.remove("nuit");
        document.body.classList.toggle("jour");
        mark.classList.remove("surligne-nuit");
        mark.classList.toggle("surligne-jour");
};
}


btn.addEventListener("click", () => {
    textContent();
});

/* Effet pour les projets */

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




