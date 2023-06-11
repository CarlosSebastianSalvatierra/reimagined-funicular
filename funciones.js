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


const mostrarDetalles = (posicion) => {
  fetch("datos.json")
    .then(res => res.json())
    .then(res => {
      const capacitacion = res[posicion]
      
      var contenedor = document.getElementById("containerDetalles");

      // Vaciar el contenido del contenedor
      contenedor.innerHTML = "";

      var tituloElement = document.createElement('h2');
      var descripcionElement = document.createElement('p');
      var presentacionFormulario = document.createElement('h4');

      // Asignar los valores del JSON a los elementos HTML
      tituloElement.textContent = capacitacion["titulo"];
      descripcionElement.textContent = capacitacion["descripcion"];
      presentacionFormulario.textContent = "Formulario de Preinscripcion"

      tituloElement.classList.add("descripcionCreada");
      descripcionElement.classList.add("descripcionCreada");
      presentacionFormulario.classList.add("descripcionCreada");

      // Agregar los elementos al div
      contenedor.appendChild(tituloElement);
      contenedor.appendChild(descripcionElement);
      contenedor.appendChild(presentacionFormulario);




      //CREACION DEL FORMULARIO

      agregarFormularioBootstrap();
      
      
      contenedor.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


const agregarFormularioBootstrap = () => {
  var contenedor = document.getElementById("containerDetalles");

  // Crear formulario de Bootstrap
  var formulario = document.createElement('form');
  formulario.classList.add('row', 'g-3', 'needs-validation');

  // Campos del formulario
  var campoNombre = crearCampoFormulario('Nombre', 'nombre', 'text', 'Ingrese su nombre');
  var campoApellido = crearCampoFormulario('Apellido', 'apellido', 'text', 'Ingrese su apellido');
  var campoDni = crearCampoFormulario('DNI', 'dni', 'text', 'Ingrese su DNI');
  var campoEmail = crearCampoFormulario('Email', 'email', 'email', 'Ingrese su correo electrónico');
  var campoTelefono = crearCampoFormulario('Teléfono', 'telefono', 'text', 'Ingrese su número de teléfono');


  // Crear div para el botón Enviar
  var divBoton = document.createElement('div');
  divBoton.classList.add('col-md-4', 'offset-md-8', 'text-center');

  // Crear botón Enviar
  var botonEnviar = document.createElement('button');
  botonEnviar.type = 'submit';
  botonEnviar.classList.add('btn', 'btn-primary');
  botonEnviar.textContent = 'Enviar';

  // Agregar el botón Enviar al div
  divBoton.appendChild(botonEnviar);

  // Agregar el div al formulario
  formulario.appendChild(divBoton);
  


  // Agregar campos al formulario
  formulario.appendChild(campoNombre);
  formulario.appendChild(campoApellido);
  formulario.appendChild(campoDni);
  formulario.appendChild(campoEmail);
  formulario.appendChild(campoTelefono);
  // Agregar el botón Enviar al formulario
  formulario.appendChild(botonEnviar);

  // Agregar el formulario al contenedor
  contenedor.appendChild(formulario);
};

// Función auxiliar para crear un campo de formulario
const crearCampoFormulario = (labelText, name, type, placeholder) => {
  var campo = document.createElement('div');
  campo.classList.add('col-md-6');

  var etiqueta = document.createElement('label');
  etiqueta.htmlFor = name;
  etiqueta.textContent = labelText;

  var input = document.createElement('input');
  input.type = type;
  input.classList.add('form-control');
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;

  campo.appendChild(etiqueta);
  campo.appendChild(input);

  return campo;
};



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