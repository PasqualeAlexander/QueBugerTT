// ========================= FUNCIONALIDAD PÁGINA DE CONTACTO =========================

// Función para inicializar la página de contacto
function inicializarContacto() {
    const textarea = document.getElementById('mensaje');
    const contador = document.querySelector('.char-counter');
    const formulario = document.querySelector('.contacto-form');
    const botonArriba = document.getElementById('scroll-button');
    
    // Contador de caracteres para el textarea
    if (textarea && contador) {
        textarea.addEventListener('input', function() {
            const longitud = this.value.length;
            const maximo = 500;
            
            contador.textContent = `${longitud}/${maximo} caracteres`;
            
            if (longitud > maximo * 0.9) {
                contador.style.color = '#ff6b35';
            } else {
                contador.style.color = '#666';
            }
            
            // Limitar la longitud
            if (longitud > maximo) {
                this.value = this.value.substring(0, maximo);
                contador.textContent = `${maximo}/${maximo} caracteres`;
                contador.style.color = '#ff4757';
            }
        });
    }
    
    // Validación del formulario
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            
            let errores = [];
            
            if (nombre.length < 2) {
                errores.push('El nombre debe tener al menos 2 caracteres');
            }
            
            if (!validarEmail(correo)) {
                errores.push('El correo electrónico no es válido');
            }
            
            if (!asunto) {
                errores.push('Por favor selecciona un asunto');
            }
            
            if (mensaje.length < 10) {
                errores.push('El mensaje debe tener al menos 10 caracteres');
            }
            
            if (errores.length > 0) {
                e.preventDefault();
                mostrarErroresContacto(errores);
                return false;
            }
            
            // Si todo está bien, mostrar mensaje de éxito
            mostrarMensajeExito();
        });
    }
    
    // Configurar botón de ir arriba
    if (botonArriba) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                botonArriba.style.opacity = '1';
                botonArriba.style.transform = 'translateY(0) scale(1)';
                botonArriba.style.pointerEvents = 'auto';
            } else {
                botonArriba.style.opacity = '0';
                botonArriba.style.transform = 'translateY(20px) scale(0.8)';
                botonArriba.style.pointerEvents = 'none';
            }
        });
    }
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para mostrar errores
function mostrarErroresContacto(errores) {
    const contenedorErrores = document.createElement('div');
    contenedorErrores.className = 'errores-contacto';
    contenedorErrores.innerHTML = `
        <div class="error-header">⚠️ Por favor corrige los siguientes errores:</div>
        <ul>${errores.map(error => `<li>${error}</li>`).join('')}</ul>
    `;
    
    // Estilos del contenedor de errores
    Object.assign(contenedorErrores.style, {
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#ff4757',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        zIndex: '1000',
        maxWidth: '500px',
        textAlign: 'left',
        boxShadow: '0 4px 20px rgba(255, 71, 87, 0.3)',
        fontSize: '14px'
    });
    
    document.body.appendChild(contenedorErrores);
    
    // Eliminar después de 5 segundos
    setTimeout(() => {
        if (contenedorErrores.parentNode) {
            contenedorErrores.style.opacity = '0';
            contenedorErrores.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                contenedorErrores.parentNode.removeChild(contenedorErrores);
            }, 300);
        }
    }, 5000);
}

// Función para mostrar mensaje de éxito
function mostrarMensajeExito() {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito-contacto';
    mensaje.innerHTML = `
        <div class="exito-icon">✅</div>
        <div class="exito-texto">
            <h3>¡Mensaje enviado con éxito!</h3>
            <p>Gracias por contactarnos. Te responderemos pronto.</p>
        </div>
    `;
    
    Object.assign(mensaje.style, {
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#4CAF50',
        color: 'white',
        padding: '25px',
        borderRadius: '15px',
        zIndex: '1000',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    });
    
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        if (mensaje.parentNode) {
            mensaje.style.opacity = '0';
            mensaje.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                mensaje.parentNode.removeChild(mensaje);
            }, 300);
        }
    }, 4000);
}
