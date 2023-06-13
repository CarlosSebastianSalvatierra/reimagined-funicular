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

      tituloElement.classList.add("descripcionCreada", "mt-4", "mb-4");
      descripcionElement.classList.add("descripcionCreada");
      presentacionFormulario.classList.add("descripcionCreada", "mt-4", "mb-4");

      //Agregando estilo a los elementos HTML
      tituloElement.style.fontFamily = "'Open Sans', sans-serif;"
      tituloElement.style.textDecorationLine = 'underline';
      descripcionElement.style.textIndent = "20px";

      // Agregar los elementos al div
      contenedor.appendChild(tituloElement);
      contenedor.appendChild(descripcionElement);
      contenedor.appendChild(presentacionFormulario);




      //CREACION DEL FORMULARIO

      agregarFormularioBootstrap();

      const margenSuperior = 80; // Ajusta el valor según tus necesidades

      contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
      // Esperar a que finalice el desplazamiento suave
      setTimeout(() => {
        window.scrollBy(0, -margenSuperior);
      }, 500); // Ajusta el tiempo de espera según tus necesidades
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


const agregarFormularioBootstrap = () => {
  var contenedor = document.getElementById("containerDetalles");

  // Crear formulario de Bootstrap
  var formulario = document.createElement('form');
  formulario.classList.add('row', 'g-3');

  // Campos del formulario
  var campoNombre = crearCampoFormulario('Nombre', 'nombre', 'text', 'Ingrese su nombre');
  var campoApellido = crearCampoFormulario('Apellido', 'apellido', 'text', 'Ingrese su apellido');
  var campoDni = crearCampoFormulario('DNI', 'dni', 'text', 'Ingrese su DNI');
  var campoEmail = crearCampoFormulario('E-Mail', 'email', 'email', 'Ingrese su correo electrónico');
  var campoTelefono = crearCampoFormulario('Teléfono', 'telefono', 'text', 'Ingrese su número de teléfono');

  // Crear div para el botón Enviar
  var divBoton = document.createElement('div');
  divBoton.classList.add('col-md-12', 'text-center'); // Botón centrado

  // Crear botón Enviar
  var botonEnviar = document.createElement('button');
  botonEnviar.type = 'submit';
  botonEnviar.classList.add('btn', 'btn-primary', 'btn-block'); // Agregar clase btn-block
  botonEnviar.textContent = 'Preinscribirse';



  // Agregar campos al formulario
  formulario.appendChild(campoNombre);
  formulario.appendChild(campoApellido);
  formulario.appendChild(campoDni);
  formulario.appendChild(campoEmail);
  formulario.appendChild(campoTelefono);

    // Agregar el botón Enviar al div
    divBoton.appendChild(botonEnviar);

    // Agregar el div al formulario
    formulario.appendChild(divBoton);

  formulario.addEventListener('submit', validarFormularioPreiscripcion);

  // Agregar el formulario al contenedor
  contenedor.appendChild(formulario);
};


// Función auxiliar para crear un campo de formulario
const crearCampoFormulario = (labelText, id, type, placeholder) => {
  var campo = document.createElement('div');
  campo.classList.add('col-md-6');

  var etiqueta = document.createElement('label');
  etiqueta.htmlFor = id;
  etiqueta.textContent = labelText;

  var input = document.createElement('input');
  input.type = type;
  input.classList.add('form-control');
  input.id = id;
  input.placeholder = placeholder;
  input.required = true;

  campo.appendChild(etiqueta);
  campo.appendChild(input);

  return campo;
};


function validarFormularioContacto() {
  // Obtener los valores de los campos
  var nombre = document.getElementById("nombreContacto").value;
  var apellido = document.getElementById("apellidoContacto").value;
  var email = document.getElementById("emailContacto").value;
  var telefono = document.getElementById("telefonoContacto").value;

  // Verificar si los campos están vacíos
  if (nombre === "" || apellido === "" || email === "" || telefono === "") {
    alert("Todos los campos son obligatorios");
    return false;
  }

  // Verificar si el nombre y el apellido tienen más de 2 caracteres
  if (nombre.length < 2 || apellido.length < 2) {
    alert("El nombre y el apellido deben tener al menos 2 caracteres");
    return false;
  }

  if (!/^[a-zA-Z]+$/.test(nombre) || !/^[a-zA-Z]+$/.test(apellido)) {
    alert("El nombre y el apellido solo deben contener letras");
    return false;
  }

  // Verificar si el email contiene un punto y un arroba
  if (email.indexOf(".") === -1 || email.indexOf("@") === -1 || email.length < 6) {
    alert("El email debe contener un punto y un arroba y no puede tener menos de 6 caracteres");
    return false;
  }

  // Verificar si el teléfono tiene 10 dígitos
  if (telefono.length < 10 || isNaN(telefono)) {
    alert("El teléfono debe ser un número de mínimo 10 dígitos");
    return false;
  }

  // Si todas las validaciones son exitosas, se enviará el formulario
  alert("Sus datos se han enviado correctamente");
  return true;
}

function validarFormularioPreiscripcion(event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var dni = document.getElementById("dni").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;

  // Validar que el nombre y apellido tengan más de dos caracteres
  if (nombre.length < 2 || apellido.length < 2) {
    alert("El nombre y el apellido deben tener al menos 2 caracteres");
    return false;
  }

  if (!/^[a-zA-Z]+$/.test(nombre) || !/^[a-zA-Z]+$/.test(apellido)) {
    alert("El nombre y el apellido solo deben contener letras");
    return false;
  }

  // Validar que el DNI sea un número
  if (isNaN(dni)) {
    alert("El DNI debe ser un número");
    return false;
  }

  // Validar que el DNI esté entre 1 millón y 99 millones
  var dniNumero = parseInt(dni);
  if (isNaN(dniNumero) || dniNumero < 1000000 || dniNumero > 99000000) {
    alert("El DNI debe ser un número y estar entre 1 millón y 99 millones");
    return false;
  }

  // Validar que el email tenga más de 6 caracteres y contenga un arroba y un punto
  if (email.length < 6 || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    alert("El email debe tener más de 6 caracteres y contener un arroba (@) y un punto (.)");
    return false;
  }

  // Validar que el teléfono tenga al menos 10 cifras
  if (telefono.length < 10 || isNaN(telefono)) {
    alert("El teléfono debe ser un número de al menos 10 cifras");
    return false;
  }

  // Si todas las validaciones pasan, se puede enviar el formulario
  alert("Se han registrado sus datos")
  return true;
}

// FUNCION PARA LA ANIMACION DEL TEXTO AL HACER SCROLL

function checkScroll() {
  var elements = document.querySelectorAll('.scroll-animation');
  
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var position = element.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;
    
    if (position < windowHeight) {
      element.classList.add('active');
    }
  }
}
window.addEventListener('scroll', checkScroll);