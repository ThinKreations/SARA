import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import MainHead from "@/components/MainHead"
import MainHeader from "@/components/MainHeader"
const inter = Inter({ subsets: ["latin"] })
import Router from "next/router"

export default function Recovery() {
    const [isLogged, setIsLogged] = useState(false)
    const [numemp, setNumemp]=useState('')
    const [correo, setCorreo]=useState('')
    useEffect(() =>{
    const logged = localStorage.getItem('isLogged')
    if (logged === 'true'){
      setIsLogged(true)
      //Router.push('/')
    }
  },[])

    const solicitarCambio = async (e) =>{
        console.log(correo, numemp)
        e.preventDefault()
        try {
            const response = await fetch('/api/recovery',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    numemp: numemp,
                    correo: correo
                })
            })
            if (response.ok){
                Router.push('/')
            } else {
              console.log('Error en la solicitud', response)
            }
        } catch (error){
            console.error('Error de conexión xd:', error)
        }
        console.log()
    }

  return(
    <>
      <MainHead title={`Recuperar contraseña`}/>
      <div className={styles.container}>
        <MainHeader/>
        <div className={styles.MainArea}>
            <form className={styles.LogIn} onSubmit={solicitarCambio}>
                <h2 style={{marginBottom:'50px'}}>{`Recuperar Contraseña`}</h2>
                <label className={styles.logLabel}>No. de Empleado</label><br/>
                <input className={styles.logInput} type='number' value={numemp} onChange={(e)=>setNumemp(e.target.value)}/><br/>
                <label className={styles.logLabel}>Correo</label><br/>
                <input type='email' className={styles.logInput} value={correo} onChange={(e)=>setCorreo(e.target.value)}/><br/>
                <button className={styles.btnAddAlumno} style={{'margin':'25px', width:'max-content', padding:'5px'}}><b>Solicitar cambio</b></button>
            </form>
        </div>
      </div>
    </>
  )
}