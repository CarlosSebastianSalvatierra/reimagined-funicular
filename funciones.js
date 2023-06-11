function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }


  function zoomIn(img) {
    img.style.transition = "transform 0.3s ease";
    img.style.transform = "scale(1.2)";
  }
  
  function zoomOut(img) {
    img.style.transition = "transform 0.3s ease";
    img.style.transform = "";
  }

const animatedTexts = document.querySelectorAll('.animated-text');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5, // 50% del elemento visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedTexts.forEach((text) => {
  observer.observe(text);
});


function scrollToSectionMargen(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace
  var targetSection = document.querySelector(event.target.getAttribute('href'));
  var offset = 100;
  if (targetSection) {
    var targetOffset = targetSection.offsetTop - offset;
    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth'
    });
  }
}

function redirectToSection(event) {
  event.preventDefault();
  var targetSection = event.target.getAttribute('data-section');
  var offset = 150;
  
  if (targetSection) {
    var indexUrl = 'index.html'; // Cambia esto según la ubicación de tu archivo "index.html"
    window.location.href = indexUrl + targetSection; // Redirige al archivo "index.html" con la sección específica
    
    window.addEventListener('DOMContentLoaded', function() {
      var section = document.querySelector(targetSection);
      if (section) {
        var targetOffset = section.offsetTop - offset;
        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth'
        });
      }
    });
  }
}


const mostrarDetalles = () => {
  fetch('datos.json')
    .then(res => res.json())
    .then(res => {
      // Obtener la primera capacitación del arreglo
      const primerCapacitacion = res[0];

      var contenedor = document.getElementById("containerDetalles");

      // Crear elementos HTML para mostrar los detalles
      var div = document.createElement('div');
      div.classList.add("container"); // Agregar la clase "container" al div

      var tituloElement = document.createElement('p');
      var descripcionElement = document.createElement('p');

      // Asignar los valores del JSON a los elementos HTML
      tituloElement.textContent = "Título: " + primerCapacitacion.titulo;
      descripcionElement.textContent = "Descripción: " + primerCapacitacion.descripcion;

      // Agregar los elementos al div
      contenedor.appendChild(div);
      div.appendChild(idElement);
      div.appendChild(tituloElement);
      div.appendChild(descripcionElement);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


function agregarLineas() {
  // Crear elementos HTML para las líneas "Hola" y "Mundo"
  var lineaHola = document.createElement('p');
  lineaHola.textContent = "Hola";

  var lineaMundo = document.createElement('p');
  lineaMundo.textContent = "Mundo";

  // Agregar los elementos al documento HTML
  document.body.appendChild(lineaHola);
  document.body.appendChild(lineaMundo);


  var boton = document.getElementById("botonMandatario");
  boton.onclick = agregarLineas;
}