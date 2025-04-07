import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainAside";
import LogIn from "@/components/LogIn";
import Clase from "@/components/{IdClase}";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home(){
    return(
    <>
        <MainHead title='SARA'/>
        <div className={styles.container}>
        <MainAside />
        <div className={styles.MainArea}>
        {/* Aquí irá el formulario de registro de la unidad de aprendizaje/secuencia */}
        <font>
          <Link href={'Escaner/escaner'}>Holap</Link>
        </font>
        </div>
        </div>
    </>
  )
}
