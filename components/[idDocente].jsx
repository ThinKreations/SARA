import Link from "next/link"
import styles from "@/styles/Home.module.css"
import Router from "next/router";

export default function Docente(grupos){
    const fechaHoy = new Date().toISOString().split('T')[0]
    return(
        <>
        <div style={{'margin':'175px'}}>
        <center>
            <h3 style={{color:'rgb(100,100,100)'}}>Fecha: {fechaHoy}</h3>
        <table className={styles.Table} style={{marginTop:'20px'}}>
            <caption>
                {`Grupos registrados:`}
            </caption> 
            <thead>
                {grupos && grupos.length > 0 ? (
                    grupos.map((grupo, index) => (
                    <option key={index} value={`${grupo.Secuencia}-${grupo.Materia}`}>
                            {grupo.Secuencia} | {grupo.Materia}
                    </option>
                    ))
                ):(
                    <option disabled>No hay secuencias disponibles</option>
                )}
                <tr>
                    <th scope="col">Secuencia</th>
                    <th scope="col">Materia</th>
                    {/*El horario se maneja juntando las horas de inicio y final en un solo campo pero en la BD son datos separados*/}
                    <th scope="col">Horario</th>
                    <th scope="col">No. Alumnos</th>
                </tr>
            </thead>
            <tbody>
                {//Aquí se hace lo de grupos.map o algo así xd pa imprimir los grupos del profesor, solo sustituyes el contenido de los th's
                    <tr>
                    <th scope="row">4CM41</th>
                    <td scope="row">Teoría de la computación y compiladoress</td>
                    <td scope="row">7:00-9:00</td>
                    <td scope="row"><center>40</center></td>
                </tr>
                }
            </tbody>
        </table>
        {/* Este botón aunque en styles dice addAlumno en realidad sólo es un boton verde xd */}
        <button 
        className={styles.btnAddAlumno}
        style={{'margin':'25px'}} 
        onClick={()=>{Router.push('/subirGrupo')}}>
            <b>+ Grupo</b>
        </button>
        </center>
        </div>

        </>
    )
}
