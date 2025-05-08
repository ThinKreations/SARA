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
  const [isLogged, setIsLogged] = useState(false)
  const [grupos, setGrupos] = useState([])
  useEffect(() =>{
    if(localStorage.getItem('type')==2){
      Router.push(`/clases/${localStorage.getItem('grupo')}`)
    }
    console.log(localStorage.getItem('type'))
    const logged = localStorage.getItem('isLogged')
    if (logged === 'true' && localStorage.getItem('numemp')!=null){ 
      console.log(localStorage.getItem('numemp'))
      setIsLogged(true)
      fetch('/api/clases/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => res.json())
        .then((data) => setGrupos(data))
        .catch((err) => console.error('Error al obtener grupos:', err))
      } 
      
  },[])

  return(
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
        <MainHeader grupos={grupos} />
        <div className={styles.MainArea}>
          {isLogged?<Docente grupos={grupos} />:<LogIn setIsLogged={setIsLogged}/>}
        </div>
      </div>
    </>
  )
}