// Módulo para manejo de la interfaz de usuario del carrito
class CarritoUI {
    constructor() {
        this.contadoresIds = [
            'carrito-contador',
            'carrito-contador-menu',
            'contador-carrito',
            'carrito-count'
        ];
        
        this.botonesCarritoIds = [
            'carrito-flotante',
            'carrito-widget', 
            'carrito-boton',
            'carrito-boton-principal'
        ];
    }

    // Actualizar contador del carrito
    actualizarContador(cantidadTotal) {
        // Actualizar por ID
        this.contadoresIds.forEach(id => {
            const contador = document.getElementById(id);
            if (contador) {
                this.configurarContador(contador, cantidadTotal);
            }
        });
        
        // También buscar por clases
        const contadoresPorClase = document.querySelectorAll('.carrito-contador, .contador-carrito, .carrito-contador-menu');
        contadoresPorClase.forEach(contador => {
            this.configurarContador(contador, cantidadTotal);
        });
        
        // Forzar visibilidad de botones del carrito
        this.forzarVisibilidadBotones();
    }

    // Configurar un contador individual
    configurarContador(contador, cantidadTotal) {
        if (cantidadTotal > 0) {
            // Quitar la marca de limpiado si existe
            contador.removeAttribute('data-limpiado');
            
            // FORZAR que se muestre incluso si estaba oculto por limpieza
            contador.textContent = cantidadTotal;
            contador.style.display = 'inline';
            contador.style.visibility = 'visible';
            contador.style.opacity = '1';
            // Resetear cualquier posicionamiento extraño
            contador.style.position = '';
            contador.style.left = '';
            contador.style.top = '';
            
            // Forzar repaint para asegurar que se vea
            contador.offsetHeight;
            
        } else {
            contador.textContent = '';
            contador.style.display = 'none';
            contador.style.visibility = 'hidden';
            contador.style.opacity = '0';
        }
    }

    // Forzar la visibilidad de todos los botones del carrito
    forzarVisibilidadBotones() {
        this.botonesCarritoIds.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.style.display = elemento.tagName.toLowerCase() === 'button' ? 'flex' : 'block';
                elemento.style.visibility = 'visible';
                elemento.style.opacity = '1';
                // Asegurar que no tenga clases que lo oculten
                elemento.classList.remove('hidden', 'oculto', 'd-none');
                // Restaurar posición fija si es necesario
                this.restaurarPosicionCarrito();
            }
        });
        
        // También buscar elementos por clase
        const elementosCarrito = document.querySelectorAll('.carrito-flotante, .carrito-flotante-menu, .btn-carrito');
        elementosCarrito.forEach(elemento => {
            elemento.style.display = elemento.tagName.toLowerCase() === 'button' ? 'flex' : 'block';
            elemento.style.visibility = 'visible';
            elemento.style.opacity = '1';
            elemento.classList.remove('hidden', 'oculto', 'd-none');
        });
        
        // CRÍTICO: Asegurar que NO se afecten los botones del menú
        this.protegerBotonesMenu();
    }

    // Restaurar posición correcta del carrito flotante
    restaurarPosicionCarrito() {
        const carritoFlotante = document.getElementById('carrito-flotante');
        if (carritoFlotante) {
            // Forzar posición fija en la esquina inferior derecha
            carritoFlotante.style.position = 'fixed';
            carritoFlotante.style.bottom = '30px';
            carritoFlotante.style.right = '30px';
            carritoFlotante.style.zIndex = '9999';
            carritoFlotante.style.transform = 'none'; // Resetear cualquier transformación
        }
    }

    // Proteger los botones del menú de interferencias
    protegerBotonesMenu() {
        // Asegurar que TODOS los botones de menú mantengan su estado original
        const botonesMenu = document.querySelectorAll('.btn-comprar, .btn-agregar-carrito-menu');
        botonesMenu.forEach(boton => {
            // Solo restaurar si no tienen estilo inline que los oculte intencionalmente
            if (!boton.style.display || boton.style.display !== 'none') {
                boton.style.visibility = 'visible';
                boton.style.opacity = '1';
                boton.style.position = 'static'; // Mantener posición normal
                // No cambiar display, mantener el original del CSS
                if (!boton.style.display) {
                    boton.style.display = 'inline-flex';
                }
            }
        });
        
        // Específicamente proteger los botones de la Boom Burger
        const boomBurger = document.getElementById('boom-burger');
        if (boomBurger) {
            const botonesBoom = boomBurger.querySelectorAll('.btn-comprar, .btn-agregar-carrito-menu');
            botonesBoom.forEach(boton => {
                boton.style.visibility = 'visible';
                boton.style.opacity = '1';
                boton.style.display = 'inline-flex';
                boton.style.position = 'static';
                boton.style.transform = 'none';
            });
        }
    }

    // Forzar contadores a cero
    forzarContadorACero() {
        // Resetear por ID
        this.contadoresIds.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                this.resetearContador(elemento);
            }
        });
        
        // Resetear por clase
        const contadoresPorClase = document.querySelectorAll('.carrito-contador, .contador-carrito, .carrito-contador-menu');
        contadoresPorClase.forEach(elemento => {
            this.resetearContador(elemento);
        });
    }

    // Resetear un contador individual
    resetearContador(elemento) {
        // LIMPIAR completamente el contenido
        elemento.textContent = '0';
        elemento.innerHTML = '0';
        
        // Si tiene atributos de datos, limpiarlos también
        if (elemento.dataset) {
            elemento.dataset.count = '0';
            elemento.dataset.cantidad = '0';
        }
        
        // SOLO OCULTAR cuando sea 0, pero mantener capacidad de mostrarse
        elemento.style.display = 'none';
        elemento.style.visibility = 'hidden';
        elemento.style.opacity = '0';
        
        // Remover marca de limpiado para permitir actualizaciones futuras
        elemento.removeAttribute('data-limpiado');
        
        // FORZAR repaint del navegador
        elemento.offsetHeight;
    }

    // Actualizar contenido del carrito modal
    actualizarContenidoCarrito(items, obtenerTotal, crearElementoCarrito) {
        const contenidoCarrito = document.getElementById('carrito-contenido');
        const totalCarrito = document.getElementById('carrito-total');
        const botonFinalizar = document.querySelector('#carrito-modal .btn-comprar, .btn-finalizar-compra, #finalizar-compra');
        
        if (!contenidoCarrito) {
            return;
        }
        
        if (items.length === 0) {
            contenidoCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
            if (totalCarrito) totalCarrito.textContent = '$0';
            
            // Ocultar SOLO el botón de finalizar compra DEL CARRITO
            if (botonFinalizar) {
                botonFinalizar.style.display = 'none';
            }
            return;
        }

        // Limpiar contenido anterior COMPLETAMENTE
        contenidoCarrito.innerHTML = '';
        
        // FORZAR que el contenedor sea visible
        contenidoCarrito.style.display = 'block';
        contenidoCarrito.style.visibility = 'visible';
        contenidoCarrito.style.opacity = '1';
        
        // Crear elementos del carrito uno por uno CON VERIFICACIÓN
        items.forEach((item, index) => {
            try {
                const itemElement = crearElementoCarrito(item);
                if (itemElement) {
                    contenidoCarrito.appendChild(itemElement);
                } else {
                    console.error(`❌ Error: itemElement es null para ${item.nombre}`);
                }
            } catch (error) {
                console.error(`❌ Error creando elemento para ${item.nombre}:`, error);
            }
        });
        
        // VERIFICACIÓN FINAL del DOM
        const elementosCreados = contenidoCarrito.children.length;
        
        if (elementosCreados !== items.length) {
            console.error('🚨 DESINCRONIZACIÓN DETECTADA: Elementos en DOM ≠ Items en array');
        }

        if (totalCarrito) {
            totalCarrito.textContent = `$${obtenerTotal()}`;
        }
        
        // Mostrar SOLO el botón de finalizar compra DEL CARRITO
        if (botonFinalizar) {
            botonFinalizar.style.display = 'flex';
            botonFinalizar.style.visibility = 'visible';
            botonFinalizar.style.opacity = '1';
        }
    }

    // Actualizar apariencia del botón del carrito
    actualizarAparienciaBotonCarrito(cantidadTotal) {
        // Buscar todos los botones de carrito
        const botonesCarrito = [
            document.getElementById('carrito-flotante'),
            document.getElementById('carrito-widget'),
            document.getElementById('carrito-boton')
        ].filter(btn => btn !== null);
        
        botonesCarrito.forEach(boton => {
            // Mantener el botón siempre visible
            boton.style.display = 'flex';
            boton.style.visibility = 'visible';
            boton.style.opacity = '1';
            
            // Forzar que el color del texto sea blanco
            boton.style.color = 'white';
            
            // Actualizar estilo basado en contenido
            if (cantidadTotal > 0) {
                boton.classList.add('carrito-con-items');
                boton.classList.remove('carrito-vacio');
            } else {
                boton.classList.add('carrito-vacio');
                boton.classList.remove('carrito-con-items');
            }
        });
    }

    // Verificar si debe ocultar el carrito en ciertas páginas
    debeOcultarCarrito() {
        const paginasExcluidas = [
            'contacto.html',
            'contacto'
        ];
        
        const rutaActual = window.location.pathname.toLowerCase();
        const nombreArchivo = rutaActual.split('/').pop();
        
        return paginasExcluidas.some(pagina => 
            rutaActual.includes(pagina) || nombreArchivo === pagina
        );
    }

    // Alternar visibilidad del carrito modal
    alternarCarrito(items, sincronizarConLocalStorage, actualizarContenidoCarrito, actualizarBotonFinalizarCompra, forzarRecreacionInmediata, verificarContenidoDespuesDeAbrir) {
        const carritoModal = document.getElementById('carrito-modal');
        if (carritoModal) {
            const isVisible = carritoModal.style.display === 'block';
            carritoModal.style.display = isVisible ? 'none' : 'block';
            
            // Cuando se abre el carrito, FORZAR actualización completa
            if (!isVisible) {
                // Sincronizar con localStorage primero
                sincronizarConLocalStorage();
                
                // VERIFICACIÓN CRÍTICA: Detectar problema antes de mostrar
                const contenidoCarrito = document.getElementById('carrito-contenido');
                if (contenidoCarrito && items.length > 0) {
                    // Si hay desincronización, forzar recreación INMEDIATA
                    if (contenidoCarrito.children.length === 0 && items.length > 0) {
                        forzarRecreacionInmediata();
                    }
                }
                
                // Actualizar contenido y botón
                actualizarContenidoCarrito();
                actualizarBotonFinalizarCompra();
                
                // Verificación adicional después de un breve delay
                setTimeout(() => {
                    verificarContenidoDespuesDeAbrir();
                }, 100);
            }
            
            // Cuando se cierra el carrito, asegurar que el botón mantenga su posición
            if (isVisible) {
                this.restaurarPosicionCarrito();
            }
            
            // CRÍTICO: Proteger botones del menú al abrir/cerrar carrito
            setTimeout(() => {
                this.protegerBotonesMenu();
            }, 100);
        }
    }
}

// Exportar para usar en otros módulos
window.CarritoUI = CarritoUI;
