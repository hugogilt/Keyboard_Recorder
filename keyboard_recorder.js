/**
 * © 2024 Hugo Gil Tejero. Todos los derechos reservados.
 *
 * Este código es propiedad intelectual de Hugo Gil Tejero, desarrollador independiente.
 * Queda prohibida la copia, modificación, distribución o uso no autorizado de este código 
 * en cualquier forma sin el permiso previo por escrito del autor.
 *
 * Para consultas o solicitudes de permiso, por favor contacta a: hugogiltejero@gmail.com
 **/


// Crear y estilizar el círculo de grabación
const circle = document.createElement('div');
circle.style.position = 'fixed';
circle.style.boxSizing = 'content-box';
circle.style.top = '10px';
circle.style.right = '10px';
circle.style.width = '60px';  
circle.style.height = '60px'; 
circle.style.borderRadius = '50%';
circle.style.backgroundColor = 'red';
circle.style.zIndex = '9999999999999999999999999999999999999999999';
circle.style.display = 'none';
circle.style.textAlign = 'center';
circle.style.lineHeight = '60px';
circle.style.fontSize = '14px';
circle.style.color = 'white';
circle.style.fontWeight = 'bold';

circle.textContent = 'REC';

// Añadir el círculo al body
document.body.appendChild(circle);

// Estilo para la animación de parpadeo
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
@keyframes blinking {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.circle {
    animation: blinking 1s infinite;
}
`;
document.head.appendChild(styleSheet);

// Variables para capturar las teclas
let capturingKeys = false;
let capturedKeys = '';

// Teclas que deben ser ignoradas siempre
const ignoredKeys = ['Tab', 'CapsLock', 'Escape'];

// Función para iniciar/detener la captura
document.addEventListener('keydown', function (e) {
    // Si se presiona Ctrl/Cmd + 0, alternar captura
    if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        if (capturingKeys) {
            // Detener la captura
            capturingKeys = false;
            circle.style.display = 'none';
            navigator.clipboard.writeText(capturedKeys).then(() => {});
        } else {
            // Iniciar la captura
            capturingKeys = true;
            capturedKeys = '';
            circle.style.display = 'block';
            circle.classList.add('circle');
        }
    }

    // Ignorar las teclas no deseadas
    if (ignoredKeys.includes(e.key)) {
        return;
    }

    // Capturar teclas válidas durante la grabación
    if (capturingKeys && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === 'Backspace') {
            // Borrar el último carácter de la variable
            capturedKeys = capturedKeys.slice(0, -1);
        } else if (e.key === 'Enter') {
            // Agregar un salto de línea
            capturedKeys += '\n';
        } else if (e.key.length === 1) {
            // Capturar solo caracteres imprimibles
            capturedKeys += e.key;
        }

        // Actualizar el portapapeles
        if(capturedKeys.length !== 0)
        navigator.clipboard.writeText(capturedKeys).then(() => {});
    }

    // Si se presiona Ctrl/Cmd + V, detener captura
    if (capturingKeys && (e.metaKey || e.ctrlKey) && e.key === 'v') {
        capturingKeys = false;
        circle.style.display = 'none'; // Ocultar el círculo
    }
});
