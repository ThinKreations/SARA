import React from "react";
import Router from "next/router";
import styles from '@/styles/Home.module.css'

export default function MainAside(){
    let numDigits = Math.floor(Math.random() * 8) + 1;
    let randomNumber = Math.floor(Math.random() * Math.pow(10, numDigits));
    return ( 
        <>
        <header className={styles.Aside}>
            <h1>SARA</h1>
            <div className={styles.btnAreaAside}>
                <button className={styles.btnSecuencia} onClick={()=>{Router.push('/')}}>Inicio</button><br/>
                <button className={styles.btnSecuencia} onClick={()=>{Router.push('/subirGrupo')}}>+ Crear Secuencia</button>
                {/*Las secuencias de materia se anotarán en base a las secuencias que tenga el profesor*/}
                <button className={styles.btnSecuencia} onClick={()=>{Router.push(`/clases/${randomNumber}`)}}>Materia (Secuencia)</button>
                <p>Nombre Profesor</p>
                <button className={styles.btnExit}>Cerrar Sesión</button>
            </div>
        </header>
        </>
    )
}