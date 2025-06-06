import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainHeader";
import LogIn from "@/components/LogIn";
import Link from "next/link";
import swal from "sweetalert";
import FileUploader from "@/components/FileUploader";
import { useEffect, useState } from "react";
//import handleUpload from './api/clases'
const inter = Inter({ subsets: ["latin"] })
import Router from "next/router";


export default function SubirGrupo(){
    const [isLogged, setIsLogged] = useState(false)
  const [grupos, setGrupos] = useState([])
    useEffect(() =>{
      if(localStorage.getItem('type')==2){
        Router.push(`/clases/${localStorage.getItem('grupo')}`)
      }
      const logged = localStorage.getItem('isLogged');
      if (logged === 'true'){
        setIsLogged(true);
        fetch('/api/clases/',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((res) => res.json())
          .then((data) => setGrupos(data))
          .catch((err) => console.error('Error al obtener grupos:', err))
      }else{
        swal({
          title: "Acceso denegado",
          text: "Debes iniciar sesión para subir un archivo.",
          icon: "warning",
        })
        Router.push('/')
      }
    }, [])
    
    return(
    <>
        <MainHead title='SARA'/>
        <div className={styles.container}>
        <MainAside grupos={grupos}/>
        <div className={styles.MainArea}>
            <div style={{'textAlign':'center', 'margin':'200px'}}>
            <p>Sube el PDF de la lista generada por el SAES aquí:</p>
            
            <FileUploader/>
            </div>
        </div>
        </div>
    </>
  )
}
