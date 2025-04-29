import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import MainHead from "@/components/MainHead"
import MainHeader from "@/components/MainHeader"
import LogIn from "@/components/LogIn"
import Docente from "@/components/[idDocente]"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [isLogged, setIsLogged] = useState(false)
  const [grupos, setGrupos] = useState([])

  useEffect(() =>{
    const logged = localStorage.getItem('isLogged')
    if (logged === 'true'){
      setIsLogged(true)
      fetch('/api/clases/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setGrupos(data))
        .catch((err) => console.error('Error al obtener grupos:', err))
    }
  },[])
  console.log('Grupos: ', grupos)

  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainHeader grupos={grupos} />
        <div className={styles.MainArea}>
          {isLogged?<Docente />:<LogIn setIsLogged={setIsLogged}/>}
        </div>
      </div>
    </>
  )
}