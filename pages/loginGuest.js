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

export default function Home() {
    const [invitado, setInvitado] = useState(0)
    /*
    const handleSubmit = async (e) =>{
        e.preventDefault()
        

    }*/

  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainHeader/>
        <div className={styles.MainArea}>
            <form className={styles.LogIn}>
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