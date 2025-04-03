import React from "react";
import Router from "next/router";
import styles from '@/styles/Home.module.css'

export default function MainAside(){
    return ( 
        <>
        <header className={styles.Aside}>
            <h1>SARA</h1>
            <div className={styles.btnAreaAside}>
                <button className={styles.btnSecuencia} onClick={()=>{Router.push('/')}}>Inicio</button><br/>
                <button className={styles.btnSecuencia} onClick={()=>{Router.push('/subirGrupo')}}>+ Crear Secuencia</button>
                <button className={styles.btnSecuencia} onClick={()=>{Router.push('/')}}>Materia (Secuencia)</button>
                <p>Nombre Profesor</p>
                <button className={styles.btnExit}>Cerrar Sesión</button>
            </div>
        </header>
        </>
    )
}