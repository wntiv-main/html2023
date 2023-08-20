function initParallax() {
	var navHeight = document.getElementsByClassName("pre-nav")[0].getBoundingClientRect().height + document.getElementsByClassName("navbar")[0].getBoundingClientRect().height;
	for(var el of document.getElementsByClassName("parallax-container")) {
		el.firstElementChild.style.height = (el.lastElementChild.offsetTop + el.lastElementChild.getBoundingClientRect().height / 2 + window.innerHeight / 2) + "px";
	}
	for(var el of document.getElementsByClassName("parallax-object")) {
		el.style.setProperty("--center-on", (el.getBoundingClientRect().height / 2 - el.parentElement.getBoundingClientRect().height + navHeight) + "px");
		var style = window.getComputedStyle(el, null);
		var scale = parseFloat(style.getPropertyValue("--z-offset")) / parseFloat(style.getPropertyValue("--perspective"));
		el.style.setProperty("--left-offset", `${(el.getBoundingClientRect().left + parseFloat(style.getPropertyValue("--left-offset") || 0))}px`);
	}

	for(var carousel of document.getElementsByClassName("carousel")) {
		var max = 0;
		for(var image of carousel.children) {
			max = Math.max(max, image.naturalHeight / image.naturalWidth * image.width);
		}
		carousel.style.setProperty("--carousel-height", `${max}px`);
	}
}

initParallax();
window.addEventListener("resize", initParallax);
document.querySelectorAll("img").forEach(el => el.addEventListener("load", initParallax));

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
	Promise.all;
}

// document.getElementsByClassName("content")[0].addEventListener("scroll", () => {
// 	for(var topic of document.getElementsByClassName("topic")) {
// 		var box = topic.getBoundingClientRect();
// 		topic.style.setProperty("--angle", `${Math.asin(-(box.top + box.height / 2 - window.innerHeight / 2) / (2 * window.innerHeight))}rad`);
// 	}
// });