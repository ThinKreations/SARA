import React from "react";
import Router from "next/router";
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import user from '@/src/user.png'
import Link from "next/link";

export default function MainHeader(){
    let numDigits = Math.floor(Math.random() * 8) + 1;
    let randomNumber = Math.floor(Math.random() * Math.pow(10, numDigits));
    return ( 
        <>
        <header className={styles.Header}>
            <h1 style={{'margin':'10px','alignContent':'center'}}><Link href={'/'} style={{'color':'white', 'textDecoration':'none'}}>SARA</Link></h1>
            <div className={styles.btnAreaHeader}> {/* por el flex-reverse, las cosas están acomodadas al revés, pero automáticamente se ordenan */}
                
                <button className={styles.btnH} onClick={()=>{Router.push('/')}}>Inicio</button>
                <button className={styles.btnH} onClick={()=>{Router.push('/subirGrupo')}}>+ Grupo</button>
                <select className={styles.btnH} style={{'maxWidth':'180px', 'textWrap':'wrap', 'wordBreak':'break-word'}} onChange={()=>{Router.push(`/clases/${randomNumber}`)}}>
                    <option>Seleccionar secuencia</option>
                    <option>XDDDDDDDDDDDDDDDDDDDDDDd</option> {/* Se generarán dinámicamente dependiendo de las secuencias del profesor */}
                </select>
                
                <button className={styles.btnExit}></button>
                
                </div>
        </header>
        </>
    )
}