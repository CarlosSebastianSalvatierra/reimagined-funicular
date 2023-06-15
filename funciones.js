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
  event.preventDefault(); 
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

      // Scrolleo adonde aparecen los datos
      const margenSuperior = 80;
      contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
      setTimeout(() => {
        window.scrollBy(0, -margenSuperior);
      }, 500);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


const agregarFormularioBootstrap = () => {
  var contenedor = document.getElementById("containerDetalles");

  var formulario = document.createElement('form');
  formulario.classList.add('row', 'g-3');

  var campoNombre = crearCampoFormulario('Nombre', 'nombre', 'text', 'Ingrese su nombre');
  var campoApellido = crearCampoFormulario('Apellido', 'apellido', 'text', 'Ingrese su apellido');
  var campoDni = crearCampoFormulario('DNI', 'dni', 'text', 'Ingrese su DNI');
  var campoEmail = crearCampoFormulario('E-Mail', 'email', 'email', 'Ingrese su correo electrónico');
  var campoTelefono = crearCampoFormulario('Teléfono', 'telefono', 'text', 'Ingrese su número de teléfono');
  var campoDireccion = crearCampoFormulario('Dirección', 'direccion', 'text', 'Ingrese su dirección');

  var divBoton = document.createElement('div');
  divBoton.classList.add('col-md-12', 'text-center'); 

  var botonEnviar = document.createElement('button');
  botonEnviar.type = 'submit';
  botonEnviar.classList.add('btn', 'btn-primary', 'btn-block');
  botonEnviar.textContent = 'Preinscribirse';

  formulario.appendChild(campoNombre);
  formulario.appendChild(campoApellido);
  formulario.appendChild(campoDni);
  formulario.appendChild(campoEmail);
  formulario.appendChild(campoTelefono);
  formulario.appendChild(campoDireccion)

  divBoton.appendChild(botonEnviar);

  formulario.appendChild(divBoton);

  formulario.addEventListener('submit', validarFormularioPreiscripcion);

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
  var nombre = document.getElementById("nombreContacto").value;
  var apellido = document.getElementById("apellidoContacto").value;
  var email = document.getElementById("emailContacto").value;
  var telefono = document.getElementById("telefonoContacto").value;
  

  // INICIO CAMBIOS

  const nombreInput = document.getElementById('nombreContacto');
  const apellidoInput = document.getElementById('apellidoContacto');
  const emailInput = document.getElementById('emailContacto');
  const telefonoInput = document.getElementById('telefonoContacto');
  
  if (nombreInput.value.match(/^[A-Za-z\s]{2,}$/)) {
    nombreInput.classList.remove('is-invalid');
    nombreInput.classList.add('is-valid');
  } else {
    nombreInput.classList.remove('is-valid');
    nombreInput.classList.add('is-invalid');
  }
  
  if (apellidoInput.value.match(/^[A-Za-z\s]{2,}$/)) {
    apellidoInput.classList.remove('is-invalid');
    apellidoInput.classList.add('is-valid');
  } else {
    apellidoInput.classList.remove('is-valid');
    apellidoInput.classList.add('is-invalid');
  }
  
  if (emailInput.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
  } else {
    emailInput.classList.remove('is-valid');
    emailInput.classList.add('is-invalid');
  }
  
  if (telefonoInput.value.match(/^\d{10,}$/)) {
    telefonoInput.classList.remove('is-invalid');
    telefonoInput.classList.add('is-valid');
  } else {
    telefonoInput.classList.remove('is-valid');
    telefonoInput.classList.add('is-invalid');
  }

  // FIN CAMBIOS

  if (nombre === "" || apellido === "" || email === "" || telefono === "") {
    alert("Todos los campos son obligatorios");
    return false;
  }

  if (nombre.length < 2 || apellido.length < 2) {
    alert("El nombre y el apellido deben tener al menos 2 caracteres");
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(nombre) || !/^[a-zA-Z\s]+$/.test(apellido)) {
    alert("El nombre y el apellido solo deben contener letras");
    return false;
  }

  if (!(emailInput.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/))) {
    alert("El texto ingresado no cumple con el formato de e-mail");
    return false;
  }

  if (telefono.length < 10 || isNaN(telefono) || /[+\-/*=]/.test(telefono)) {
    alert("El teléfono debe ser un número de mínimo 10 dígitos");
    return false;
  }

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
  var direccion = document.getElementById("direccion").value;


// INICIO CAMBIOS

let nombreInput = document.getElementById('nombre');
let apellidoInput = document.getElementById('apellido');
let dniInput = document.getElementById('dni');
let emailInput = document.getElementById('email');
let telefonoInput = document.getElementById('telefono');
let direccionInput = document.getElementById('direccion');

if (nombreInput.value.match(/^[A-Za-z\s]{2,}$/)) {
  nombreInput.classList.remove('is-invalid');
  nombreInput.classList.add('is-valid');
} else {
  nombreInput.classList.remove('is-valid');
  nombreInput.classList.add('is-invalid');
}

if (apellidoInput.value.match(/^[A-Za-z\s]{2,}$/)) {
  apellidoInput.classList.remove('is-invalid');
  apellidoInput.classList.add('is-valid');
} else {
  apellidoInput.classList.remove('is-valid');
  apellidoInput.classList.add('is-invalid');
}

if (dniInput.value.match(/^[0-9]{7,8}$/)) {
  dniInput.classList.remove('is-invalid');
  dniInput.classList.add('is-valid');
} else {
  dniInput.classList.remove('is-valid');
  dniInput.classList.add('is-invalid');
}

if (emailInput.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
  emailInput.classList.remove('is-invalid');
  emailInput.classList.add('is-valid');
} else {
  emailInput.classList.remove('is-valid');
  emailInput.classList.add('is-invalid');
}

if (telefonoInput.value.match(/^\d{10,}$/)) {
  telefonoInput.classList.remove('is-invalid');
  telefonoInput.classList.add('is-valid');
} else {
  telefonoInput.classList.remove('is-valid');
  telefonoInput.classList.add('is-invalid');
}

if (direccion.length > 8) {
  direccionInput.classList.remove('is-invalid');
  direccionInput.classList.add('is-valid');
} else {
  direccionInput.classList.remove('is-valid');
  direccionInput.classList.add('is-invalid');
}

// FIN CAMBIOS



  if (nombre.length < 2 || apellido.length < 2) {
    alert("El nombre y el apellido deben tener al menos 2 caracteres");
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(nombre) || !/^[a-zA-Z\s]+$/.test(apellido)) {
    alert("El nombre y el apellido solo deben contener letras");
    return false;
  }

  if (isNaN(dni)) {
    alert("El DNI debe ser un número");
    return false;
  }


  var dniNumero = parseInt(dni);
  if (isNaN(dniNumero) || dniNumero < 1000000 || dniNumero > 99000000) {
    alert("El DNI debe ser un número y estar entre 1 millón y 99 millones");
    return false;
  }

  if (!(emailInput.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/))) {
    alert("El texto ingresado no cumple con el formato de e-mail");
    return false;
  }

  if (telefono.length < 10 || isNaN(telefono) || /[+\-/*=]/.test(telefono)) {
    alert("El teléfono debe ser un número de al menos 10 cifras");
    return false;
  }

  if (direccion.length < 8) {
    alert("La dirección debe tener más de 8 caracteres");
    return false;
  } 
  

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




