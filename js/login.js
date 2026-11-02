
// ==========================================
// MED-BAY - Validación del inicio de sesión
// ==========================================

// 1. Seleccionar los elementos del formulario

const formulario = document.querySelector("#formularioLogin");
const correo = document.querySelector("#correo");
const contrasena = document.querySelector("#contrasena");
const mensaje = document.querySelector("#mensajeLogin");

// 2. Escuchar el envío del formulario

formulario.addEventListener("submit", function(event) {

    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Limpiar los espacios al inicio y al final
    const correoIngresado = correo.value.trim();
    const contrasenaIngresada = contrasena.value.trim();

    // 3. Validar campos vacíos

    if (correoIngresado === "" || contrasenaIngresada === "") {

        mensaje.textContent = "Debes completar todos los campos.";
        mensaje.classList.add("mensaje-error");

        return;
    }

    // 4. Validar formato del correo

    if (!correo.validity.valid) {

        mensaje.textContent = "Ingresa un correo electrónico válido.";
        mensaje.classList.add("mensaje-error");

        return;
    }

    // 5. Mostrar resultado de la validación

    mensaje.classList.remove("mensaje-error");
    mensaje.textContent =
        "Formulario validado correctamente. Demostración académica.";

});
