let slideIndex = 1;

function showSlides(n) {
	
	let slides = document.getElementsByClassName("slide");
	let dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";	
}

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	slideIndex = n;
	showSlides(slideIndex);
}

window.onload = init;

function init() {
	showSlides(slideIndex);	
	shwoRandom();
}

async function shwoRandom() {
	const sect = document.getElementById("obiective");
	try {
		const result = await fetch("obiective.json");
		const obiective = await result.json();

		const button = document.getElementById("ob");
		let i = 0;
		button.onclick = () => {
			const obbut = document.getElementById("obbut");
			obbut.remove();
			if (i >= obiective.length)
				return;
			const div = document.createElement("div");
			const h2 = document.createElement("h2");
			h2.innerHTML = obiective[i].nume;
			const h4_1 = document.createElement("h4");
			h4_1.innerHTML = 	 "Țara: " + obiective[i].tara;
			const h4_2 = document.createElement("h4");
			h4_2.innerHTML = "Locație: " + obiective[i].locatie;
			const p = document.createElement('p');
			p.innerHTML = obiective[i].descriere;
			const img = document.createElement('img');
			img.src = obiective[i].imagine;
			img.alt = "Imaginea nu a fost gasita";
			img.height = 500;
			div.appendChild(h2);
			div.appendChild(h4_1);
			div.appendChild(h4_2);
			div.appendChild(img);
			div.appendChild(p);
			sect.appendChild(div);
			div.scrollIntoView({
				behavior: 'smooth'
			});
			i++;
			setInterval(() => {
				if (i >= obiective.length)
					return;
				const div = document.createElement("div");
				const h2 = document.createElement("h2");
				h2.innerHTML = obiective[i].nume;
				const h4_1 = document.createElement("h4");
				h4_1.innerHTML = "Țara: " + obiective[i].tara;
				const h4_2 = document.createElement("h4");
				h4_2.innerHTML = "Locație: " + obiective[i].locatie;
				const p = document.createElement('p');
				p.innerHTML = obiective[i].descriere;
				const img = document.createElement('img');
				img.src = obiective[i].imagine;
				img.alt = "Imaginea nu a fost gasita";
				img.height = 500;
				div.appendChild(h2);
				div.appendChild(h4_1);
				div.appendChild(h4_2);
				div.appendChild(img);
				div.appendChild(p);
				sect.appendChild(div);
				div.scrollIntoView({
					behavior: 'smooth'
				});
				i++;
			}, 2000);
			
		}	
	}
	catch (error) {
		console.log(error)
	}
}	

