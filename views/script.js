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
	shwoObiective();
	const button = document.getElementById('buttonfv');
	button.style.visibility = 'hidden';
	randomLocation()
}

async function shwoObiective() {
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
			div.id = "obvDiv";
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
			img.height = 200;
			div.appendChild(h2);
			div.appendChild(h4_1);
			div.appendChild(h4_2);
			div.appendChild(img);
			div.appendChild(p);
			const colors = ['#18434e', '#d8ddea', '#a1bdd0', '#78949f'];
			div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
			sect.appendChild(div);
			div.scrollIntoView({
				behavior: 'smooth'
			});
			i++;
			setInterval(() => {
				if (i >= obiective.length)
					return;
				const div = document.createElement("div");
				div.id = "obvDiv";
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
				img.height = 200;
				div.appendChild(h2);
				div.appendChild(h4_1);
				div.appendChild(h4_2);
				div.appendChild(img);
				div.appendChild(p);
				div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
				document.getElementById('listaLoc').appendChild(div);
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


function randomLocation() {
	const loc = document.getElementById("ap");
	loc.addEventListener('click', handleClick);
	
}
let butonExista = false;
async function handleClick(event) {
	try {
		const result = await fetch("https://raw.githubusercontent.com/catalin87/baza-de-date-localitati-romania/master/date/localitati.json");
		const localitati = await result.json();

		const randLoc = localitati[Math.floor(Math.random()* localitati.length)];
		
		const div = document.createElement('div');
		const a = document.createElement('a');
		a.href = `https://www.google.com/maps/place/${randLoc.lat},${randLoc.lng}`;
		a.innerHTML = "Vezi localiatea pe Google Maps";
		a.target = "_blank";
		
		const nume = document.createElement('h2');
		nume.id = randLoc.id - 1;
		nume.innerHTML = randLoc.nume;
		const judet = document.createElement('p');
		judet.innerHTML = `Județul: ${randLoc.judet}`;
		const populatie = document.createElement('p');
		populatie.innerHTML = `Populație: ${randLoc.populatie}`;
		
		div.appendChild(nume);
		div.appendChild(judet);
		div.appendChild(populatie);
		div.appendChild(a);
		document.getElementById('listaLoc').appendChild(div);
		// const loc = document.getElementById("ap");
		// loc.appendChild(div);
		a.addEventListener('click', (event) => {
			event.stopPropagation();
		})
		nume.addEventListener('click', (event) => {
			event.stopPropagation();
			let locSalvata =  event.target.id;
			localStorage.setItem('locSalvata', locSalvata);
			//console.log(locSalvata);
		});
		
		document.getElementById('apasaNume').innerHTML = "Apasă pe numele unei localități pentru a o salva ca localitate favorită";

		const button = document.getElementById('buttonfv');
		button.style.visibility = 'visible';
		button.onclick = (event) => {
			event.stopPropagation();
			document.getElementById('listaLoc').innerHTML = "";
			const locFav = localitati[localStorage.getItem('locSalvata')];
			console.log(locFav);
			if (locFav == null)
				alert("Nu ati ales o localitate favorita");
			else {
				// if (document.getElementById('locFavDiv')) 
				// 	document.getElementById('locFavDiv').remove();
				const div = document.createElement('div');
				div.id = 'locFavDiv';
				const a = document.createElement('a');
				a.href = `https://www.google.com/maps/place/${locFav.lat},${locFav.lng}`;
				a.innerHTML = "Vezi localiatea pe Google Maps";
				a.target = "_blank";
				const nume = document.createElement('h2')
				nume.innerHTML = locFav.nume;
				const judet = document.createElement('p');
				judet.innerHTML = `Județul: ${locFav.judet}`;
				const populatie = document.createElement('p');
				populatie.innerHTML = `Populație: ${locFav.populatie}`;

				div.appendChild(nume);
				div.appendChild(judet);
				div.appendChild(populatie);
				div.appendChild(a);
				a.addEventListener('click', (event) => {
					event.stopPropagation();
				});
				document.getElementById('listaLoc').appendChild(div);
				// loc.appendChild(div);
			}
		}
	}
	catch (error) {
		console.log(error)
	}
}