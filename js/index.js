function initParallax() {
    for(var el of document.getElementsByClassName("parallax-container")) {
        el.firstElementChild.style.height = (el.lastElementChild.offsetTop + el.lastElementChild.getBoundingClientRect().height / 2 + window.innerHeight / 2) + "px";
    }
    for(var el of document.getElementsByClassName("parallax-object")) {
        el.style.setProperty("--center-on", (el.getBoundingClientRect().height / 2 - el.parentElement.getBoundingClientRect().height) + "px");
    }
}

initParallax();
window.addEventListener("resize", initParallax);

// Particles
function Particle() {
    this.element = 0;
}

Particle.images = [];
Particle.loadParticles = function() {
    var promises = [];
    for(var url of []) {
        
        var image = new Image();
        image.addEventListener("load", () => Particle.images.push(image));
        image.src = url;
    }
    Promise.all
}