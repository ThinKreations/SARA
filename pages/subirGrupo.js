import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainAside";
import LogIn from "@/components/LogIn";
import Link from "next/link";
import swal from "sweetalert";

const inter = Inter({ subsets: ["latin"] });
let result
export default function SubirGrupo(){

    const mius = ()=>{
      let audio = new Audio("/src/huh.mp3")
      console.log(audio)
      audio.play
    }

    return(
    <>
        <MainHead title='SARA'/>
        <div className={styles.container}>
        <MainAside/>
        <div className={styles.MainArea}>
        <font>
          <center>
            <p>Sube el PDF de la lista generada por el SAES aquí:</p>
            <input type='file' accept=".pdf" className={styles.pdfInput} onChange={()=>{swal({title:'Muy bn xd', icon:'success' /* Y se redireccionará a la página de la secuencia en específico */})}}></input>
          </center>
        </font>
        </div>
        
        </div>
    </>
  )
}
