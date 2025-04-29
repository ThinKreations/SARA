import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import MainHead from "@/components/MainHead"
import MainAside from "@/components/MainHeader"
import LogIn from "@/components/LogIn"
import Docente from "@/components/[idDocente]"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const [numemp, setNumemp]=useState('')
    const [nombre, setNombre]=useState('')
    const [correo, setCorreo]=useState('')
    const [pass, setPass]=useState('')

  useEffect(() => {
    const logged=localStorage.getItem('isLogged')
    if (logged==='true'){
      setIsLogged(true)
    }
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
        const response = await fetch('api/signUp',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numemp: numemp,
                nombreProfesor: nombre,
                correo: correo,
                password: pass
            })
        })
        if (response.ok){
            console.log('Registro exitoso')
            window.location.reload()
        } else {
            console.log('Error en el registro', response)
        }
    } catch (error){
        console.error('Error de conexión:', error)
    }
}
  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainAside/>
        <div className={styles.MainArea}>
            <form className={styles.LogIn} onSubmit={handleSubmit} style={{'marginTop':'100px'}}>
                <label className={styles.logLabel}>No. de Empleado</label><br/>
                <input className={styles.logInput} value={numemp} onChange={(e)=>setNumemp(e.target.value)}/><br/>
                <label className={styles.logLabel}>Nombre completo</label><br/>
                <input className={styles.logInput} value={nombre} onChange={(e)=>setNombre(e.target.value)}/><br/>
                <label className={styles.logLabel}>Correo</label><br/>
                <input className={styles.logInput} value={correo} onChange={(e)=>setCorreo(e.target.value)} type="email"/><br/>
                <label className={styles.logLabel}>Contraseña</label><br/>
                <input type='password' className={styles.logInput} value={pass} onChange={(e)=>setPass(e.target.value)}/><br/>
                <button type="submit" className={styles.logBtn}>Acceder</button>
                <br/>
            </form>
        </div>
      </div>
    </>
  )
}
