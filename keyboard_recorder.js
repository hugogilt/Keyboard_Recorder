const circle = document.createElement('div');
circle.style.position = 'fixed';
circle.style.boxSizing = 'content-box';
circle.style.top = '10px';
circle.style.right = '10px';
circle.style.width = '60px';  // Mantener un círculo pequeño
circle.style.height = '60px'; // Igual que el ancho para mantener la forma circular
circle.style.borderRadius = '50%'; // Asegura que sea un círculo
circle.style.backgroundColor = 'red';
circle.style.zIndex = '9999999999999999999999999999999999999999999';
circle.style.display = 'none'; // Inicialmente está oculto
circle.style.textAlign = 'center';
circle.style.lineHeight = '60px'; // Centra el texto verticalmente
circle.style.fontSize = '14px'; // Hacemos el texto aún más pequeño
circle.style.color = 'white';
circle.style.fontWeight = 'bold';

// Añadir el texto "REC" dentro del círculo
circle.textContent = 'REC';

// Añadir el círculo al body
document.body.appendChild(circle);

// Estilo para la animación de parpadeo más lento
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
    animation: blinking 1s infinite;  // Hacemos el parpadeo más lento con 2 segundos
}
`;
document.head.appendChild(styleSheet);

// Variables para capturar las teclas
let capturingKeys = false;
let capturedKeys = '';

// Función para iniciar/detener la captura
document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        if (capturingKeys) {
            // Detener la captura
            capturingKeys = false;
            console.log('Captura detenida');
            circle.style.display = 'none'; // Ocultar el círculo
            navigator.clipboard.writeText(capturedKeys).then(() => {
                console.log('Texto guardado en el portapapeles:', capturedKeys);
            });
        } else {
            // Iniciar la captura
            capturingKeys = true;
            capturedKeys = '';
            console.log('Captura iniciada');
            circle.style.display = 'block'; // Mostrar el círculo
            circle.classList.add('circle');  // Añadimos la clase para activar la animación de parpadeo
        }
    }

    if (capturingKeys && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        capturedKeys += e.key; // Capturar las teclas
    }
});