// =============================================
// BITWARS COHORTE 2025 - PROGRAMACIÓN IV
// SEPTIEMBRE 2026
// =============================================
// LÓGICA DE LA TIENDA CON CHECKOUT PRO
// =============================================

const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
  setup() {
    // =============================================
    // VARIABLES REACTIVAS
    // =============================================
    const productos = ref([]);
    const carrito = ref([]);
    const cargando = ref(true);
    const agregadoReciente = ref(null);
    const procesandoPago = ref(false);

    // =============================================
    // CARGAR PRODUCTOS AL INICIAR
    // =============================================
    onMounted(async () => {
      try {
        const response = await fetch('/api/productos');
        if (!response.ok) throw new Error('Error en la respuesta');
        const data = await response.json();
        productos.value = data;
      } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('No se pudo cargar el catálogo. Revisá la consola.');
      } finally {
        cargando.value = false;
      }
    });

    // =============================================
    // AGREGAR PRODUCTO AL CARRITO
    // =============================================
    const agregarAlCarrito = (producto) => {
      const itemExistente = carrito.value.find(item => item.id === producto.id);

      if (itemExistente) {
        itemExistente.cantidad++;
      } else {
        carrito.value.push({
          id: producto.id,
          nombre: producto.nombre,
          codigo: producto.codigo,
          precio: Number(producto.precio),
          cantidad: 1
        });
      }

      agregadoReciente.value = producto.id;
      setTimeout(() => { agregadoReciente.value = null; }, 800);
    };

    // =============================================
    // CONTROLES DEL CARRITO
    // =============================================
    const aumentarCantidad = (item) => { item.cantidad++; };

    const disminuirCantidad = (item) => {
      if (item.cantidad > 1) item.cantidad--;
      else eliminarDelCarrito(item);
    };

    const eliminarDelCarrito = (item) => {
      carrito.value = carrito.value.filter(i => i.id !== item.id);
    };

    const vaciarCarrito = () => {
      if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
        carrito.value = [];
      }
    };

    // =============================================
    // COMPUTADAS
    // =============================================
    const totalCarrito = computed(() => {
      return carrito.value.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    });

    const cantidadItems = computed(() => {
      return carrito.value.reduce((total, item) => total + item.cantidad, 0);
    });

    // =============================================
    // PAGAR CON MERCADO PAGO (Checkout Pro)
    // =============================================
    const pagarCarrito = async () => {
      if (carrito.value.length === 0) return;

      procesandoPago.value = true;

      try {
        const items = carrito.value.map(item => ({
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio
        }));

        const response = await fetch('/api/pago/crear-preferencia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items })
        });

        const data = await response.json();

        if (data.init_point) {
          window.location.href = data.init_point;
        } else {
          alert('Error: No se recibió la URL de pago');
          procesandoPago.value = false;
        }
      } catch (error) {
        console.error('Error al iniciar pago:', error);
        alert('Hubo un problema al conectar con Mercado Pago.');
        procesandoPago.value = false;
      }
    };

    return {
      productos,
      carrito,
      cargando,
      agregadoReciente,
      procesandoPago,
      agregarAlCarrito,
      aumentarCantidad,
      disminuirCantidad,
      eliminarDelCarrito,
      vaciarCarrito,
      totalCarrito,
      cantidadItems,
      pagarCarrito
    };
  },

  template: `
    <div>
      <header class="header-bitwars">
        <img src="/bitwars.png" alt="Logo Bitwars" class="logo" />
        <h1>Grupo Bitwars Cohorte 2025</h1>
        <p>Programación IV - Septiembre 2026</p>
      </header>

      <div class="layout-principal">
        <main class="contenido-catalogo">
          <h2 class="titulo-catalogo">Catálogo de Productos Tregar</h2>
          <div v-if="cargando" class="loading">Cargando productos...</div>
          <div v-else class="grid-productos">
            <div v-for="producto in productos" :key="producto.id" class="card">
              <img 
                :src="'/img/' + producto.codigo + '.png'" 
                :alt="producto.nombre" 
                class="producto-img"
                @error="(e) => e.target.src = 'https://via.placeholder.com/100x100?text=Sin+Imagen'"
              >
              <h3 class="nombre">{{ producto.nombre }}</h3>
              <p class="descripcion">{{ producto.descripcion }}</p>
              <span class="codigo">Código: {{ producto.codigo }}</span>
              <p class="precio">\${{ Number(producto.precio).toFixed(2) }}</p>
              <button 
                class="btn-agregar"
                :class="{ agregado: agregadoReciente === producto.id }"
                @click="agregarAlCarrito(producto)"
              >
                {{ agregadoReciente === producto.id ? '✓ Agregado' : 'Agregar al Carrito' }}
              </button>
            </div>
          </div>
        </main>

        <aside class="carrito">
          <h3>🛒 Carrito ({{ cantidadItems }})</h3>
          <div v-if="carrito.length === 0" class="carrito-vacio">
            El carrito está vacío.<br>¡Agregá productos!
          </div>
          <div v-else>
            <div v-for="item in carrito" :key="item.id" class="carrito-item">
              <img 
                :src="'/img/' + item.codigo + '.png'" 
                :alt="item.nombre" 
                class="carrito-item-img"
                @error="(e) => e.target.src = 'https://via.placeholder.com/40x40?text=?'"
              >
              <div class="carrito-item-info">
                <div class="carrito-item-nombre">{{ item.nombre }}</div>
                <div class="carrito-item-precio">\${{ item.precio.toFixed(2) }}</div>
              </div>
              <div class="carrito-item-cantidad">
                <button @click="disminuirCantidad(item)">−</button>
                <span>{{ item.cantidad }}</span>
                <button @click="aumentarCantidad(item)">+</button>
                <button class="btn-eliminar" @click="eliminarDelCarrito(item)">×</button>
              </div>
            </div>
            <div class="carrito-total">
              <span>TOTAL:</span>
              <span>\${{ totalCarrito.toFixed(2) }}</span>
            </div>
            <button 
              class="btn-pagar-carrito" 
              @click="pagarCarrito"
              :disabled="procesandoPago"
            >
              {{ procesandoPago ? 'Procesando...' : 'Pagar con Mercado Pago' }}
            </button>
            <button class="btn-vaciar" @click="vaciarCarrito">
              Vaciar Carrito
            </button>
          </div>
        </aside>
      </div>
    </div>
  `
});

app.mount('#app');