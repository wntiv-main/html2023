function initParallax() {
	var navHeight = document.getElementsByClassName("pre-nav")[0].getBoundingClientRect().height + document.getElementsByClassName("navbar")[0].getBoundingClientRect().height;
	for(var el of document.getElementsByClassName("parallax-container")) {
		var bottomMostChild = el.lastElementChild;
		while(bottomMostChild.classList.contains("particle") || window.getComputedStyle(bottomMostChild, null).getPropertyValue("position") == "absolute") {
			bottomMostChild = bottomMostChild.previousElementSibling;
		}
		el.firstElementChild.style.height = (bottomMostChild.offsetTop + bottomMostChild.getBoundingClientRect().height / 2 + window.innerHeight / 2) + "px";
	}
	for(var el of document.getElementsByClassName("parallax-object")) {
		el.style.setProperty("--center-on", (el.getBoundingClientRect().height / 2 - el.parentElement.getBoundingClientRect().height + navHeight) + "px");
		var style = window.getComputedStyle(el, null);
		if(!el.classList.contains("particle"))
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
// Images that might redirect flow
document.querySelectorAll("img").forEach(el => el.addEventListener("load", initParallax));

// [min, max)
function randint(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

// Particles
function Particle() {
	// Typechecking bs.. can remove when out of dev
	var img = new Image();
	img = Particle.images[randint(0, Particle.images.length)].cloneNode();
	img.classList.add("particle");
	img.classList.add("parallax-object");
	img.style.setProperty("--z-index", randint(-100, 300));
	var leftOffset = randint(0, (window.innerWidth - 900) / 2);
	if(Math.random() > 0.5) leftOffset = window.innerWidth - leftOffset - 100;
	img.style.setProperty("left", `${leftOffset}px`);
	img.style.setProperty("top", `${-randint(0, 1000)}px`);
	document.getElementsByClassName("content")[0].appendChild(img);
	this.image = img;
}

Particle.sources = particleImages;
Particle.images = [];
Particle.loadParticles = async function() {
	var promises = [];
	for(var url of Particle.sources) {
		promises.push(new Promise((res, rej) => {
			var image = new Image();
			image.addEventListener("load", () => {
				res(image);
			});
			image.addEventListener("error", () => res(null));
			image.src = url;
		}));
	}
	return Promise.all(promises).then(ims => Particle.images = ims.filter(im => im != null));
}

Particle.loadParticles().then(() => {
	for(var i = 0; i < 100; i++) {
		new Particle();
	}
});

// document.getElementsByClassName("content")[0].addEventListener("scroll", () => {
// 	for(var topic of document.getElementsByClassName("topic")) {
// 		var box = topic.getBoundingClientRect();
// 		topic.style.setProperty("--angle", `${Math.asin(-(box.top + box.height / 2 - window.innerHeight / 2) / (2 * window.innerHeight))}rad`);
// 	}
// });