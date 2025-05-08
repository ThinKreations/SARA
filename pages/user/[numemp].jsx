import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import MainHead from "@/components/MainHead"
import MainHeader from "@/components/MainHeader"
const inter = Inter({ subsets: ["latin"] })
import Router from "next/router"
import swal from "sweetalert"

export default function cambiarContra() {
  const [isLogged, setIsLogged] = useState(false)
  const [pass, setPass] = useState('')
  const [vpass, setVPass] = useState('')

  useEffect(() =>{
    const logged = localStorage.getItem('isLogged')
    console.log(logged)
    if (logged !== 'true'&&((localStorage.getItem('numemp')===null||localStorage.getItem('numemp')===undefined))){
      Router.push('/')
    }
  },[])

    const cambiarContra = async (e) =>{
    e.preventDefault()
    if(pass===vpass){
        try {
            const response = await fetch('/api/updatePass',{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: pass,
                    numemp: localStorage.getItem('numemp')
                })
            })
            if (response.ok){
                localStorage.clear()
                alert('Contraseña Actualizada')
                Router.push('/')
            } else {
              console.log('Error en la solicitud', response)
            }
        } catch (error){
            console.error('Error de conexión xd:', error)
        }
    }else{
        swal({ title: "Contraseñas diferentes", icon: "error" });
    }
    console.log()
    }



  return(
    <>
      <MainHead title={`Cambiar contraseña`}/>
      <div className={styles.container}>
        <MainHeader/>
        <div className={styles.MainArea}>
            <form className={styles.LogIn} onSubmit={cambiarContra}>
                <h2 style={{marginBottom:'50px'}}>{`Cambiar Contraseña`}</h2>
                <label className={styles.logLabel}>Nueva contraseña</label><br/>
                <input className={styles.logInput} type='password' value={pass} onChange={(e)=>{setPass(e.target.value)}}/><br/>
                <label className={styles.logLabel}>Verificar contraseña</label><br/>
                <input className={styles.logInput} type='password' value={vpass} onChange={(e)=>{setVPass(e.target.value)}}/><br/>
                <button type='submit' className={styles.btnAddAlumno} style={{'margin':'25px', width:'max-content', padding:'5px'}}><b>Cambiar contraseña</b></button>
            </form>
        </div>
      </div>
    </>
  )
}