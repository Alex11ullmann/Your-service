import CuerpoPerfiles from '../components/Perfiles/CuerpoPerfiles'
const esTrabajador = true; {/* esto tendria que venir del RegistroUsuario*/}

export default function Perfiles () {
    return (
        <CuerpoPerfiles esTrabajador={esTrabajador}/>
    )
}