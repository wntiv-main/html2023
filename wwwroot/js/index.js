function initParallax() {
	var navHeight = document.getElementsByClassName("pre-nav")[0].getBoundingClientRect().height + document.getElementsByClassName("navbar")[0].getBoundingClientRect().height;
	for(var el of document.getElementsByClassName("parallax-container")) {
		var bottomMostChild = el.lastElementChild;
		while(bottomMostChild.classList.contains("particle") || window.getComputedStyle(bottomMostChild, null).getPropertyValue("position") == "absolute") {
			bottomMostChild = bottomMostChild.previousElementSibling;
		}
		var height = (bottomMostChild.offsetTop + bottomMostChild.getBoundingClientRect().height / 2 + window.innerHeight / 2);
		el.firstElementChild.style.height = height + "px";
		el.firstElementChild.style.setProperty("--center-on", -height + "px");
	}
	for(var el of document.getElementsByClassName("parallax-object")) {
		if(el == el.parentElement.firstElementChild) continue;
		el.style.setProperty("--center-on", (el.getBoundingClientRect().height / 2 - el.parentElement.getBoundingClientRect().height + navHeight) + "px");
		var style = window.getComputedStyle(el, null);
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
		var zOffset = randint(-100, 400);
		el.style.setProperty("--z-offset", zOffset);

		var leftOffset = randint(450, window.innerWidth / 2);
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
	constructor() {
	}

	async addSource(source) {
		return source.load().then(() => {
			this.totalWeight += source.weight;
			this.sources.push(source);
		});
	}

	getSource() {
		var selected = randint(0, this.totalWeight);
		for(var source of this.sources) {
			if(selected < source.weight) return source;
			selected -= source.weight;
		}
	}

	create() {
		return this.getSource().getNode();
	}
}

function varyHue(el) {
	el.style.filter = `hue-rotate(${randint(-20, 20)}deg)`;
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


// document.getElementsByClassName("content")[0].addEventListener("scroll", () => {
// 	for(var topic of document.getElementsByClassName("topic")) {
// 		var box = topic.getBoundingClientRect();
// 		topic.style.setProperty("--angle", `${Math.asin(-(box.top + box.height / 2 - window.innerHeight / 2) / (2 * window.innerHeight))}rad`);
// 	}
// });