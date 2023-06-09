// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const notificacionCarrito = document.getElementById('notificacion-carrito');
let articulosCarrito = [];

añadirNotificacion(articulosCarrito.length);
cargarEventListeners();

function cargarEventListeners() {

     listaCursos.addEventListener('click', agregarCurso);
     carrito.addEventListener('click', eliminarCurso);
     
     vaciarCarritoBtn.addEventListener('click', () => {
      articulosCarrito = []
      vaciarCarrito()
      añadirNotificacion(articulosCarrito.length)
     });
}

// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
     añadirNotificacion(articulosCarrito.length)
}

function añadirNotificacion(cantidad) {
  if (cantidad !== 0) {
      notificacionCarrito.dataset.cantidadnotificacion = articulosCarrito.length
      notificacionCarrito.classList.add('notificacion-carrito--visible')
  } else if (cantidad === 0) {
      notificacionCarrito.classList.remove('notificacion-carrito--visible')
  }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // console.log(articulosCarrito)
     // console.log(articulosCarrito)
     carritoHTML();
}

function eliminarCurso(event){
  if(event.target.classList.contains('borrar-curso')){    
    const idCurso = event.target.getAttribute('data-id');    
    articulosCarrito.forEach(curso => {
      if(curso.id === idCurso){
       // si la cantidad es mayor a 1 entonces cantidad--
        if(curso.cantidad > 1){
          // actualizamos la cantidad
          curso.cantidad--;
          // mostramos de nuevo el html
          carritoHTML();
        }else{
           // recorremos con filter
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso); 
          // volvemos a cargar el html 
          carritoHTML();
        }
        añadirNotificacion(articulosCarrito.length)
      }
    });
    
  }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {

     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}

