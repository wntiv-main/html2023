// [min, max)
function randint(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

class RandomImageSource {
	url = "";
	width = "100px";
	weight = 1;
	postprocess = (r, g, b) => [r, g, b];
	#imageNode = null;

	constructor(obj) {
		if("url" in obj) this.url = obj.url;
		if("width" in obj) this.width = obj.width;
		if("weight" in obj) this.weight = obj.weight;
		if("postprocess" in obj) this.postprocess = obj.postprocess;
	}

	async load() {
		return new Promise((res, rej) => {
			var img = new Image();
			img.addEventListener("load", () => {
				this.#imageNode = this.postLoad(img);
				res();
			});
			img.addEventListener("error", () => rej());
			img.style.width = this.width;
			img.src = this.url;
			// TODO: apply postprocess
		});
	}

	postLoad(el) {
		return el;
	}
	postClone(el) {
		return el;
	}

	getNode() {
		return this.postClone(this.#imageNode.cloneNode());
	}
}


class ParticleSource extends RandomImageSource {
	additionalEffects = el => el;
	constructor(obj) {
		super(obj);
		if("additionalEffects" in obj) this.additionalEffects = obj.additionalEffects;
	}

	postLoad(el) {
		el.classList.add("particle");
		el.classList.add("parallax-object");
		return super.postLoad(el);
	}

	postClone(el) {
		el.classList.add("particle");
		el.classList.add("parallax-object");

		el.style.setProperty("width", this.width);
		var zOffset = randint(-100, 300);
		el.style.setProperty("--z-offset", zOffset);

		var leftOffset = randint(470, window.innerWidth / 2);
		if(Math.random() > 0.5) leftOffset = -leftOffset;
		el.style.setProperty("--left", `${leftOffset}px`);
		el.style.setProperty("--top", `${randint(0, document.getElementsByClassName("content")[0].scrollHeight)}px`);

		document.getElementsByClassName("content")[0].appendChild(el);
		return super.postClone(this.additionalEffects(el));
	}
}

class ParticleManager {
	sources = [];
	totalWeight = 0;
	particles = [];
	constructor() {
	}

	async addSource(source) {
		return source.load().then(() => {
			this.totalWeight += source.weight;
			this.sources.push(source);
		});
	}

	getSource() {
		if(!this.totalWeight) throw new Error("No sources to select");
		var selected = randint(0, this.totalWeight);
		for(var source of this.sources) {
			if(selected <= source.weight) return source;
			selected -= source.weight;
		}
	}

	create() {
		var particle = this.getSource().getNode();
		this.particles.push(particle);
		return particle;
	}

	handleResize() {
		if(!this.totalWeight) return;
		var widestWidth = 470;
		if(window.innerWidth < 470 * 2) {
			for(var i = 0; i < this.particles.length; i++) {
				particles[i].remove();
			}
			particles = [];
		}
		for(var i = 0; i < this.particles.length; i++) {
			var leftOffset = Math.abs(parseFloat(this.particles[i].style.getPropertyValue("--left")));
			var width = this.particles[i].getBoundingClientRect().width;
			widestWidth = Math.max(widestWidth, leftOffset);
			// Check particle is outside of screen space
			if(leftOffset > width + window.innerWidth / 2) {
				this.particles[i].remove();
				this.particles.splice(i, 1);
				i--;
			}
		}
		// TODO: create new particles
		this.create();
	}
}

function varyHue(el) {
	el.style.filter = `hue-rotate(${randint(-20, 20)}deg)`;
	return el;
}

var particles = new ParticleManager();
Promise.allSettled([
	particles.addSource(new ParticleSource({
		url: "./img/particles/point_star.png",
		width: "10px",
		weight: 20
	})),
	particles.addSource(new ParticleSource({
		url: "./img/particles/star1.png",
		width: "50px",
		additionalEffects: varyHue
	})),
	particles.addSource(new ParticleSource({
		url: "./img/particles/star2.png",
		width: "50px",
		additionalEffects: varyHue
	})),
	particles.addSource(new ParticleSource({
		url: "./img/particles/star3.png",
		width: "50px",
		additionalEffects: varyHue
	})),
	particles.addSource(new ParticleSource({
		url: "./img/particles/star4.png",
		width: "50px",
		additionalEffects: varyHue
	})),
	particles.addSource(new ParticleSource({
		url: "./img/particles/star5.png",
		width: "50px",
		additionalEffects: varyHue
	})),
	particles.addSource(new ParticleSource({
		url: "./img/particles/star6.png",
		width: "50px",
		additionalEffects: varyHue
	}))
]).then(() => {
	for(let i = 0; i < 100; i++) {
		particles.create();
	}
});

function resize() {
	// Height of background parallax element, may replace with fixed background..
	for(var el of document.getElementsByClassName("parallax-container")) {
		var bottomMostChild = el.lastElementChild;
		while(bottomMostChild.classList.contains("particle") || window.getComputedStyle(bottomMostChild, null).getPropertyValue("position") == "absolute") {
			bottomMostChild = bottomMostChild.previousElementSibling;
		}
		var height = (bottomMostChild.offsetTop + bottomMostChild.getBoundingClientRect().height / 2 + window.innerHeight / 2);
		el.firstElementChild.style.height = height + "px";
	}

	// fix alignment of weird elements (usually .content-box.left/.right)
	for(var el of document.getElementsByClassName("parallax-object fix-alignment")) {
		var style = window.getComputedStyle(el, null);
		if(el.getElementsByClassName("right").length) {
			el.style.setProperty("--left-offset", `${(el.getBoundingClientRect().right - window.innerWidth + parseFloat(style.getPropertyValue("--left-offset") || 0))}px`);
		} else {
			el.style.setProperty("--left-offset", `${(el.getBoundingClientRect().left + parseFloat(style.getPropertyValue("--left-offset") || 0))}px`);
		}
	}

	// Carousel height
	for(var carousel of document.getElementsByClassName("carousel")) {
		var max = 0;
		for(var image of carousel.children) {
			if(!(image instanceof HTMLImageElement)) continue;
			image.style.width = `${carousel.getBoundingClientRect().width}px`;
			max = Math.max(max, image.naturalHeight / image.naturalWidth * carousel.getBoundingClientRect().width);
		}
		carousel.style.setProperty("--carousel-height", `${max}px`);
	}

	particles.handleResize();
}

var contentContainer = document.getElementsByClassName("content")[0];
//// F%$^*(#&)(*#s performance, hmmm
// contentContainer.addEventListener("scroll", () => {
// 	contentContainer.style.setProperty("--scroll-height", contentContainer.scrollTop);
// });

resize();
// AHHH this needs to be here to work dont ask me why
setTimeout(resize, 10);
// i love performance >:)
window.addEventListener("resize", resize);
// Images that might redirect flow
document.querySelectorAll("img.affects-flow").forEach(el => el.addEventListener("load", resize));

for(var el of document.getElementsByClassName("prev")) {
	el.addEventListener("click", e => {
		el.parentElement.scrollBy(-Math.min(900, window.innerWidth), 0);
	});
	// Gets called for mouse clicks but not keyboard users
	el.addEventListener("mouseup", el.blur);
}

for(var el of document.getElementsByClassName("next")) {
	el.addEventListener("click", e => {
		el.parentElement.scrollBy(Math.min(900, window.innerWidth), 0);
	});
	// Gets called for mouse clicks but not keyboard users
	el.addEventListener("mouseup", el.blur);
}

document.addEventListener("mousemove", e => {
	document.body.style.setProperty("--mouseX", e.clientX);
	document.body.style.setProperty("--mouseY", e.clientY);
});

// document.getElementsByClassName("content")[0].addEventListener("scroll", () => {
// 	for(var content-box of document.getElementsByClassName("content-box")) {
// 		var box = content-box.getBoundingClientRect();
// 		content-box.style.setProperty("--angle", `${Math.asin(-(box.top + box.height / 2 - window.innerHeight / 2) / (2 * window.innerHeight))}rad`);
// 	}
// });