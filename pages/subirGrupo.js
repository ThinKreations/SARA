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
let result


export default function SubirGrupo(){
    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
      const logged = localStorage.getItem('isLogged');
      if (logged === 'true') {
        setIsLogged(true);
      } else {
        swal({
          title: "Acceso denegado",
          text: "Debes iniciar sesión para subir un archivo.",
          icon: "warning",
        }).then(() => {
          window.location.href = '/'; // Redirige si no está logueado
        });
      }
    }, []);
    const handleUpload = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch('https://upiicsara-225fbcffb78e.herokuapp.com/grupo/', {
          method: "POST",
          
          body:formData,
        })
        if (!response.ok) {
          throw new Error("Error al subir el archivo");
        }
        const data = await response.json();
        swal({ title: "Archivo subido correctamente", icon: "success" });
        console.log(data);
        Router.push('/')
      }catch (error){
        console.error("Error al subir archivo:", error);
        swal({ title: "Error al subir archivo", icon: "error" });
      }
    };

    return(
    <>
        <MainHead title='SARA'/>
        <div className={styles.container}>
        <MainAside/>
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
