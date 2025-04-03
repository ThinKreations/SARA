import React from 'react';
import styles from '@/styles/Home.module.css'

export default function LogArea(){

    return(
        <>
        <form className={styles.LogIn}>
            <label className={styles.logLabel}>Correo</label><br/>
            <input className={styles.logInput}/><br/>
            <label className={styles.logLabel}>Contraseña</label><br/>
            <input type='password' className={styles.logInput}/><br/>
            <button className={styles.logBtn}>Acceder</button>
        </form>
        </>
    )
}