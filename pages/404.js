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

export default function _404() {
  const [isLogged, setIsLogged] = useState(false)
  const [grupos, setGrupos] = useState([])
  useEffect(() =>{
    Router.back()
  },[])

  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainHeader/>
        <div className={styles.MainArea}>
            <h1 style={{margin:'175px', fontSize:'20vw'}}>404</h1>
        </div>
      </div>
    </>
  )
}