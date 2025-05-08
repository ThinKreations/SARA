import React from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useState } from 'react';

export default function LogArea(){
    const [numemp, setNumemp]=useState('')
    const [pass, setPass]=useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await fetch('/api/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    numemp: numemp,
                    password: pass
                })
            })
            const data = await response.json()
            if (response.ok){
                console.log('Login exitoso', data)
                localStorage.setItem('isLogged', 'true')
                localStorage.setItem('type', 1)
                localStorage.setItem('numemp', numemp)
                window.location.reload()
            } else {
                console.log('Error en el inicio', response)
            }
        } catch (error) {
            console.error('Error de conexión:', error)
        }
    }

    return (
        <>
            <form className={styles.LogIn} onSubmit={handleSubmit}>
                <label className={styles.logLabel}>No. de Empleado</label><br/>
                <input className={styles.logInput} type='number' value={numemp} onChange={(e)=>setNumemp(e.target.value)}/><br/>
                <label className={styles.logLabel}>Contraseña</label><br/>
                <input type='password' className={styles.logInput} value={pass} onChange={(e)=>setPass(e.target.value)}/><br/>
                <button type="submit" className={styles.btnAddAlumno} style={{padding:'15px', fontSize:'20px', width:'max-content'}}><b>Acceder</b></button>
                <br/>
                <Link href={'loginGuest'} style={{color:'blue', textDecoration:'none', margin:'5px'}}><p>Acceder como invitado</p></Link>
                <Link href={'recovery'} style={{color:'blue', textDecoration:'none', margin:'5px'}}><p>Olvidé mi contraseña</p></Link>
                <Link href={'signUp'} style={{color:'blue', textDecoration:'none', margin:'10px'}}><p>Registrate aquí</p></Link>
            </form>
        </>
    )
}