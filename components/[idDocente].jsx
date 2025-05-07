import Link from "next/link"
import styles from "@/styles/Home.module.css"
import Router from "next/router";

export default function Docente(grupos){
    const fechaHoy = new Date().toISOString().split('T')[0]
    return(
        <>
        <div style={{'margin':'175px'}}>
        <center>
            <h3 style={{color:'rgb(100,100,100)'}}>Fecha: {fechaHoy}</h3>
        <h2>Bienvenido</h2>
        <button className={styles.btnAddAlumno} style={{'margin':'25px'}} onClick={()=>{Router.push('/subirGrupo')}}>
            <b>+ Grupo</b>
        </button>
        <Link href={`/user/${localStorage.getItem('numemp')}`} style={{color:'black', textDecoration:'none'}}><p>Cambiar contraseña</p></Link>
        </center>
        </div>

        </>
    )
}
