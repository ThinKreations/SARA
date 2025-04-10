import { useRouter } from 'next/router';  // Usar useRouter
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainAside";
import { Scanner } from '@yudiel/react-qr-scanner';
import LogIn from "@/components/LogIn";
import swal from 'sweetalert';
const inter = Inter({ subsets: ["latin"] });
import { useState } from 'react';

export default function Clase(){
  const router = useRouter();
  const {idClase} = router.query;
  const [edit, setEdit] = useState(false)

  const mius = ()=>{
    


    let audio = new Audio("/src/huh.mp3")
    console.log(audio)
    audio.play
  }

  

  let isLogged=true;
  return (
    <>
      <MainHead title='SARA'/>
      <div className={styles.container}>
      <MainAside/>
      <div className={styles.MainArea} style={{'border':'1px solid transparent', 'alignContent':'initial'}}>
      <center>
        <div className={styles.scannerDiv}>
          <Scanner scanDelay={1000} allowMultiple={true} onScan={(result) => {
            let xd = result[0].rawValue
            console.log(xd)
            mius()
            swal({
              icon: 'success',
              timer:'250ms'
            })
          }} />
          </div>
          <hr style={{'width':'90%', 'border':'1px solid rgb(220,220,220)'}}/>
          <div style={{'fontSize':'15px', 'marginBottom':'20px'}}>
            Editable
            <input type="checkbox" checked={edit} onChange={()=>setEdit(prev=>!prev)}/>
          </div>
          <table className={styles.Table}>
            <caption style={{ backgroundColor: 'transparent' }}>
              {`Secuencia - Unidad de Aprendizaje - Semestre (ID: ${idClase})`}
            </caption>
            <thead>
              <tr>
                <th scope="col">N.L.</th>
                <th scope="col">Nombre Completo</th>
                <th scope="col">03/04</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Juárez Castillo Rubén Gabriel</td>
                <td>
                  <center>
                    <input
                      type="checkbox"
                      className={styles.check}
                      disabled={!edit}
                    />
                  </center>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>López Lara José Daniel</td>
                <td>
                  <center>
                    <input
                      type="checkbox"
                      className={styles.check}
                      disabled={!edit}
                    />
                  </center>
                </td>
              </tr><tr>
                <th scope="row">2</th>
                <td>López Lara José Daniel</td>
                <td>
                  <center>
                    <input
                      type="checkbox"
                      className={styles.check}
                      disabled={!edit}
                    />
                  </center>
                </td>
              </tr><tr>
                <th scope="row">2</th>
                <td>López Lara José Daniel</td>
                <td>
                  <center>
                    <input
                      type="checkbox"
                      className={styles.check}
                      disabled={!edit}
                    />
                  </center>
                </td>
              </tr><tr>
                <th scope="row">2</th>
                <td>López Lara José Daniel</td>
                <td>
                  <center>
                    <input
                      type="checkbox"
                      className={styles.check}
                      disabled={!edit}
                    />
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
          {edit&&(
          <button onClick={()=>setEdit(false)} className={styles.btnGuardar}>
            Guardar
          </button>
        )}
        </center>
      </div>
      </div>
    </>
  )
}
