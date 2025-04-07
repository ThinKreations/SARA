import Link from "next/link"
import styles from "@/styles/Home.module.css"
export default function Docente(){
    return(
        <>
        {/* Aquí irá la tabla dinámica basada en los datos de la id de la secuencia/UA dada */}
        <center>
        <table className={styles.Table}>
            <caption>
                {`Secencias asignadas al profesor`}
            </caption> 
            <thead>
                <tr>
                    <th scope="col">Secuencia</th>
                    <th scope="col">Materia</th>
                    {/*El horario se maneja juntando las horas de inicio y final en un solo campo pero en la BD son datos separados*/}
                    <th scope="col">Horario</th>
                    <th scope="col">No. Alumnos</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">4CM41</th>
                    <td scope="row">Teoría de la computación y compiladoress</td>
                    <td scope="row">7:00-9:00</td>
                    <td scope="row"><center>40</center></td>
                </tr>
            </tbody>
        </table>
        </center>
        </>
    )
}