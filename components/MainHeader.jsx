import React from "react";
import Router from "next/router";
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import user from '@/src/user.png'
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function MainHeader({ grupos }) {
    let numDigits = Math.floor(Math.random() * 8) + 1;
    let randomNumber = Math.floor(Math.random() * Math.pow(10, numDigits));

    return (
        <>
            <header className={styles.Header}>
                <h1 style={{ 'margin': '10px', 'alignContent': 'center' }}>
                    <Link href={'/'} style={{ 'color': 'white', 'textDecoration': 'none' }}>SARA</Link>
                </h1>
                <div className={styles.btnAreaHeader}>
                    <button className={styles.btnH} onClick={() => { Router.push('/') }}>Inicio</button>
                    <button className={styles.btnH} onClick={() => { Router.push('/subirGrupo') }}>+ Grupo</button>
                    <select className={styles.btnH} style={{ maxWidth: '250px', textWrap: 'wrap', wordBreak: 'break-word', borderBottom:'1px solid rgb(80,80,80)', borderRadius:'0px' }} onChange={(e) =>{
                            console.log('Valor seleccionado:', e.target.value)
                            const selectedValue = e.target.value.split('-')
                            const secuencia = selectedValue[0].trim()
                            const grupoSeleccionado = grupos.find(grupo=>grupo.Secuencia === secuencia)
                            if (grupoSeleccionado){
                                const {Secuencia, Periodo, ID_Materia}=grupoSeleccionado
                                console.log('Grupo seleccionado:', grupoSeleccionado)
                                Router.push(`/clases/${Secuencia}${Periodo}${ID_Materia}`)
                            }else{
                                console.log('Grupo no encontrado')
                            }
                        }}>
                        <option disabled selected>Seleccionar secuencia</option>
                        {grupos && grupos.length > 0 ? (
                            grupos.map((grupo, index) => (
                                <option key={index} value={`${grupo.Secuencia}-${grupo.Materia}`}>
                                    {grupo.Secuencia} - {grupo.Materia}
                                </option>
                            ))
                        ):(
                            <option disabled>No hay secuencias disponibles</option>
                        )}
                    </select>
                    <button className={styles.btnExit} onClick={()=>{
                        localStorage.clear()
                        window.location.reload()
                    }}>Salir</button>
                </div>
            </header>
        </>
    )
}
