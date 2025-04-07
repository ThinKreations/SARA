import { useRouter } from 'next/router';  // Usar useRouter
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainAside";
import LogIn from "@/components/LogIn";

const inter = Inter({ subsets: ["latin"] });

export default function Clase(){
  const router = useRouter();
  const {idClase} = router.query;
  let isLogged=true;
  return (
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
      <MainAside/>
      <div className={styles.MainArea}>
      <center>
        <table className={styles.Table}>
            <caption>
                {`Secuencia - Unidad de Aprendizaje - Semestre (ID: ${idClase})` /* Se preguntará qué semestre está trascurriendo (como 2025-1) */}
            </caption> 
            <thead>
                <tr>
                    <th scope="col">N.L.</th>
                    <th scope="col">Nombre Completo</th>
                    {/* Aquí se asignarán una cantidadd de columnas para cada día de clase, con base en los días de clase a la semana, fecha de inicio y fin de curso, SE UTILIZARÄ UN FOR EACH, imprimiento th como el siguiente: */}
                    <th scope="col">03/04</th>
                </tr>
            </thead>
            <tbody>
                {/* Con un for each se imprimiran los alumnos con el sig. formato, incluyendo los espacios para la asistencia */}
                <tr>
                    <th scope="row">1</th>
                    <td>01</td>
                    <td>Nápoles Mungay José de Jesús</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        </center>
      </div>
      </div>
    </>
  )
}
