import React from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useState } from 'react';

export default function LogArea(){
    const [numemp, setNumemp]=useState('')
    const [pass, setPass]=useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({ numemp, pass })  // Añade esto para ver los datos que estás enviando
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    numemp: numemp,
                    password: pass
                })
            })
            if (response.ok) {
                console.log('Login exitoso')
                localStorage.setItem('isLogged', 'true')
                localStorage.setItem('numemp', numemp)
                window.location.reload()
            } else {
                console.log('Error en el login')
            }
        } catch (error) {
            console.error('Error de conexión:', error)
        }
    }


    return (
        <>
            <form className={styles.LogIn} onSubmit={handleSubmit}>
                <label className={styles.logLabel}>No. de Empleado</label><br/>
                <input className={styles.logInput} value={numemp} onChange={(e)=>setNumemp(e.target.value)}/><br/>
                <label className={styles.logLabel}>Contraseña</label><br/>
                <input type='password' className={styles.logInput} value={pass} onChange={(e)=>setPass(e.target.value)}/><br/>
                <button type="submit" className={styles.logBtn}>Acceder</button>
                <br/>
                <button type="button" className={styles.btnRedirec}>
                    Si no tienes cuenta, <Link className={styles.link} href="/register">regístrate aquí</Link>.
                </button>
            </form>
        </>
    )
}