import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainAside";
import LogIn from "@/components/LogIn";
import Docente from "@/components/[idDocente]";

const inter = Inter({ subsets: ["latin"] });

export default function Home(){
  let isLogged=true;
  return (
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
      <MainAside/>
      <div className={styles.MainArea}>
          {!isLogged?
          (<><LogIn/></>)
          :
          (<><Docente/></>)
          }
      </div>
      </div>
    </>
  )
}
