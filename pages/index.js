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
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const logged=localStorage.getItem('isLogged')
    if (logged==='true'){
      setIsLogged(true)
    }
  },[])

  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainAside/>
        <div className={styles.MainArea}>
          {isLogged?(<Docente />):(<LogIn setIsLogged={setIsLogged} />)
          }
        </div>
      </div>
    </>
  )
}
