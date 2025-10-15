import "./styleAdministrador.css"

export default function CuerpoAdministrador() {
    return (
        <div className="cuerpoAdm">
            <header>
                <h1>Panel de Administración</h1>
            </header>
            <nav>
                <ul>
                    <li><a href="./Home.html">Inicio</a></li>
                    <li><a href="">Configuración</a></li>
                    <li><a href="">Cerrar Sesión</a></li>
                </ul>
            </nav>
            <main>
                <section className="contenidoAdm">
                    <h2>Bienvenido Administrador</h2>
                    <p>Aquí puedes gestionar la plataforma.</p>
                    <div className="botonesAdm">
                        <button onClick={() => (window.location.href = './RegistroUsuario.jsx')}>Gestionar Perfil Usuarios</button>
                        <button onClick={() => (window.location.href = './RegistroTrabajador.jsx')}>Gestionar Perfil Trabajador</button>
                        <button onClick={() => (window.location.href = '')}>Ver Reportes</button>
                    </div>
                </section>
            </main>
        </div>
    )
}