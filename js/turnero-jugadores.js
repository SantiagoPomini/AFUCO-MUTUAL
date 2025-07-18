const usuario = {

    dni: "46590129",
    nombre: "Santiago Alejandro",
    apellido: "POMINI",
    telefono: "123456789",
    localidad: "Calle Falsa 123",
    email: "santipomini@gmail.com",
    nacimiento: "2005-07-05"
    // nacimiento: "05/07/2005"
};

document.getElementById("buscarBtn").addEventListener("click", function () {
    const dniIngresado = document.querySelector(".dni").value;

    if (dniIngresado === usuario.dni) {
        document.querySelector(".nombre").value = usuario.nombre;
        document.querySelector(".apellido").value = usuario.apellido;
        document.querySelector(".telefono").value = usuario.telefono;
        document.querySelector(".localidad").value = usuario.localidad;
        document.querySelector(".email").value = usuario.email;
        document.querySelector(".nacimiento").value = usuario.nacimiento;
        // alert("Usuario encontrado y datos cargados.");
    } else {
        // alert("No se encontró un usuario con ese DNI.");
    }
});

document.getElementById("formularioTurno").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que recargue la página

    const dni = document.querySelector(".dni").value;
    const nombre = document.querySelector(".nombre").value;
    const apellido = document.querySelector(".apellido").value;
    const telefono = document.querySelector(".telefono").value;
    const localidad = document.querySelector(".localidad").value;
    const email = document.querySelector(".email").value;
    const nacimiento = document.querySelector(".nacimiento").value;
    
    alert("Datos enviados:\nDNI: " + dni + "\nNombre: " + nombre + "\nApellido: " + apellido + "\nTelefono: " + telefono + "\nLocalidad: " + localidad + "\nEmail: " + email + "\nNacimiento: " + nacimiento);
});