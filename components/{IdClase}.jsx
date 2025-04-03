import Link from "next/link"
import styles from "@/styles/Home.module.css"
export default function Clase(){
    return(
        <>
        {/* Aquí irá la tabla dinámica basada en los datos de la id de la secuencia/UA dada */}
        <center>
        <table className={styles.Table}>
            <caption>
                {`Secuencia - Unidad de Aprendizaje - Semestre` /* Se preguntará qué semestre está trascurriendo (como 2025-1) */}
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
                    <td>Nombre Completo</td>
                    <td>S</td>
                </tr>
            </tbody>
        </table>
        </center>
        </>
    )
}