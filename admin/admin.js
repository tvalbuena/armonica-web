const API_URL = 'http://localhost:3000';

// Elementos del DOM
const loginContainer = document.getElementById('loginContainer');
const panelContainer = document.getElementById('panelContainer');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const inputUsuario = document.getElementById('inputUsuario');
const inputPassword = document.getElementById('inputPassword');
const errorUsuario = document.getElementById('error-usuario');
const errorPassword = document.getElementById('error-password');
const errorLogin = document.getElementById('error-login');
const tablaCitas = document.getElementById('tablaCitas');
const totalCitas = document.getElementById('totalCitas');
const citasPendientes = document.getElementById('citasPendientes');
const citasConfirmadas = document.getElementById('citasConfirmadas');

// Verificar si ya hay sesión activa
const token = localStorage.getItem('token_armonica');
if (token) {
  mostrarPanel();
  cargarCitas();
}

// Login
btnLogin.addEventListener('click', async () => {
  const usuario = inputUsuario.value.trim();
  const password = inputPassword.value.trim();

  errorUsuario.textContent = '';
  errorPassword.textContent = '';
  errorLogin.textContent = '';

  if (!usuario) {
    errorUsuario.textContent = 'El usuario es obligatorio';
    return;
  }

  if (!password) {
    errorPassword.textContent = 'La contraseña es obligatoria';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });

    const data = await response.json();

    if (!response.ok) {
      errorLogin.textContent = data.error || 'Credenciales incorrectas';
      return;
    }

    localStorage.setItem('token_armonica', data.token);
    mostrarPanel();
    cargarCitas();

  } catch (error) {
    errorLogin.textContent = 'Error de conexión. Verifica que el servidor esté corriendo.';
  }
});

// Logout
btnLogout.addEventListener('click', () => {
  localStorage.removeItem('token_armonica');
  panelContainer.style.display = 'none';
  loginContainer.style.display = 'flex';
  inputUsuario.value = '';
  inputPassword.value = '';
});

// Mostrar panel
function mostrarPanel() {
  loginContainer.style.display = 'none';
  panelContainer.style.display = 'block';
}

// Cargar citas
async function cargarCitas() {
  const token = localStorage.getItem('token_armonica');

  try {
    const response = await fetch(`${API_URL}/api/citas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 401) {
      localStorage.removeItem('token_armonica');
      panelContainer.style.display = 'none';
      loginContainer.style.display = 'flex';
      return;
    }

    const data = await response.json();
    const citas = data.citas;

    // Estadísticas
    totalCitas.textContent = citas.length;
    citasPendientes.textContent = citas.filter(c => c.estado === 'pendiente').length;
    citasConfirmadas.textContent = citas.filter(c => c.estado === 'confirmada').length;

    // Tabla
    if (citas.length === 0) {
      tablaCitas.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay citas registradas</td></tr>';
      return;
    }

  tablaCitas.innerHTML = citas.map(cita => `
  <tr>
    <td>${cita.id}</td>
    <td>${cita.nombre} ${cita.apellido}</td>
    <td>${cita.correo}</td>
    <td>${cita.telefono}</td>
    <td>${cita.procedimiento}</td>
    <td>${new Date(cita.fecha_solicitud).toLocaleDateString('es-CO')}</td>
    <td>
      <select class="form-select form-select-sm" onchange="cambiarEstado(${cita.id}, this.value)">
        <option value="pendiente" ${cita.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
        <option value="confirmada" ${cita.estado === 'confirmada' ? 'selected' : ''}>Confirmada</option>
        <option value="cancelada" ${cita.estado === 'cancelada' ? 'selected' : ''}>Cancelada</option>
      </select>
    </td>
  </tr>
`).join('');

  } catch (error) {
    tablaCitas.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error al cargar las citas</td></tr>';
  }
}
async function cambiarEstado(id, nuevoEstado) {
  const token = localStorage.getItem('token_armonica');

  try {
    const response = await fetch(`${API_URL}/api/citas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado: nuevoEstado })
    });

    const data = await response.json();

    if (!response.ok) {
      alert('Error al actualizar el estado');
      cargarCitas();
      return;
    }

    cargarCitas();

  } catch (error) {
    alert('Error de conexión');
  }
}