import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainHeader";
import LogIn from "@/components/LogIn";
import Link from "next/link";
import swal from "sweetalert";
//import handleUpload from './api/clases'
const inter = Inter({ subsets: ["latin"] })
let result

export default function SubirGrupo(){
    const mius = ()=>{
      let audio = new Audio("/src/huh.mp3")
      console.log(audio)
      audio.play
    }
    const handleUpload = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
    
      try {
        const response = await fetch("http://127.0.0.1:8000/grupo/", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Error al subir el archivo");
        }
        const data = await response.json();
        swal({ title: "Archivo subido correctamente", icon: "success" });
        console.log(data);
      } catch (error) {
        console.error("Error al subir archivo:", error);
        swal({ title: "Error al subir archivo", icon: "error" });
      }
    
      console.log(formData);
    };

    return(
    <>
        <MainHead title='SARA'/>
        <div className={styles.container}>
        <MainAside/>
        <div className={styles.MainArea}>
            <div style={{'textAlign':'center', 'margin':'200px'}}>
            <p>Sube el PDF de la lista generada por el SAES aquí:</p>
            <input 
            type='file' 
            accept=".pdf" 
            className={styles.pdfInput} 
            onChange={(e)=>handleUpload(e.target.files[0])}></input>
            </div>
        </div>
        </div>
    </>
  )
}
