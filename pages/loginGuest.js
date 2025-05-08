import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import MainHead from "@/components/MainHead"
import MainHeader from "@/components/MainHeader"
import LogIn from "@/components/LogIn"
import Docente from "@/components/[idDocente]"
import Router from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function logGuest() {
    const [invitado, setInvitado] = useState('')
    
    const handleSubmit = async (e) =>{
      console.log(invitado)
      e.preventDefault()
      try {
          const response = await fetch('/api/logGuest',{
              method: 'POST',
              headers:{
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  invitado:invitado,
              })
          })
          const data = await response.json()
          if (response.ok){
              console.log('Login exitoso', data)
              localStorage.setItem('isLogged', 'true')
              localStorage.setItem('type', 2)
              localStorage.setItem('grupo', data)
              localStorage.setItem('invitado', invitado)
              Router.push(`/clases/${data}`)
          }else{
              console.log('Error en el inicio', response)
          }
      } catch (error) {
          console.error('Error de conexión:', error)
      }
  }

  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainHeader/>
        <div className={styles.MainArea}>
            <form className={styles.LogIn} onSubmit={handleSubmit}>
                <label className={styles.logLabel}>Clave de acceso</label><br/>
                <input className={styles.logInput} type='number' value={invitado} onChange={(e)=>setInvitado(e.target.value)}/><br/>
                <button type="submit" className={styles.btnAddAlumno} style={{padding:'15px', fontSize:'20px', width:'max-content'}}><b>Acceder</b></button>
                <br/>
            </form>
        </div>
      </div>
    </>
  )
}