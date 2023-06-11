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
      presentacionFormulario.textContent = "Formulario de Preinscripción"

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
  var campoEmail = crearCampoFormulario('E-Mail', 'email', 'email', 'Ingrese su correo electrónico');
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