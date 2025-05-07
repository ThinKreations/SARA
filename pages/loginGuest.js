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
  

  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainHeader/>
        <div className={styles.MainArea}>
            <form className={styles.LogIn} onSubmit={handleSubmit}>
                <label className={styles.logLabel}>No. de Empleado</label><br/>
                <input className={styles.logInput} type='number' value={numemp} onChange={(e)=>setNumemp(e.target.value)}/><br/>
                <label className={styles.logLabel}>Contraseña</label><br/>
                <input type='password' className={styles.logInput} value={pass} onChange={(e)=>setPass(e.target.value)}/><br/>
                <button type="submit" className={styles.btnAddAlumno} style={{padding:'15px', fontSize:'20px', width:'max-content'}}><b>Acceder</b></button>
                <br/>
            </form>
        </div>
      </div>
    </>
  )
}