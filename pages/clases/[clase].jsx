import { Router, useRouter } from 'next/router';  // Usar useRouter
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainHeader";
import { Scanner } from '@yudiel/react-qr-scanner';
import swal from 'sweetalert';
const inter = Inter({ subsets: ["latin"] });
import { useState, useEffect } from 'react';
import { obtenerClase } from '../api/clases';
import {generarInvitado} from '../api/signAsistente';

export default function Clase({clase}){
  const router = useRouter();
  const idClase = router.query.clase;
  const [lista,setLista]=useState([]);
  const [isLogged, setIsLogged]=useState(null)
  const [grupos, setGrupos] = useState([])
  const [alumnos,setAlumnos]=useState([])
  const [asistencias, setAsistencias] = useState([])
  const [fechas, setFechas] = useState([])
  const [secuencia, setSecuencia] = useState([])
  const [periodo, setPeriodo] = useState([])
  const [idMateria, setIdMateria] = useState([])
  const [materia, setMateria] = useState([])
  const [profesor, setProfesor] = useState(0)
  const [asistenciaManual, setAsistenciaManual]=useState([])
  const [boletasEscaneadas, setBoletasEscaneadas] = useState([])
  const [registro, setRegistro]=useState({})
  const [isChecked, setIsChecked]=useState(false)
  const [type, setType]=useState(null)

  useEffect(()=>{
    if (!router.isReady) return;
    const logged = localStorage.getItem('isLogged');
    const uType=parseInt(localStorage.getItem('type'))
    setType(uType)
    if (logged !== 'true' ){
      router.replace('/');
      swal({title: "Inicia Sesión", icon: "error"})
    }else{
      setIsLogged(true);
      fetch('../api/clases/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setGrupos(data))
        .catch((err) => console.error('Error al obtener grupos:', err));
        if (idClase) {
          obtenerClase(idClase).then((claseData) => {
            if(parseInt((localStorage.getItem('numemp'))!== claseData.profesor[0].Profesor)){
              router.replace('/');
              swal({title: "No autorizado", icon: "error"})
            }
            setAlumnos(claseData.alumnos|| [] )
            setAsistencias(claseData.asistencias || [])
            setFechas(claseData.fechas || [])
            setProfesor(claseData.profesor[0].Profesor)
            const clase = claseData.clases?.[0] || {}
            setSecuencia(clase.Secuencia)
            setPeriodo(clase.Periodo)
            setIdMateria(clase.ID_Materia)
            setMateria(clase.Materia)
          }).catch(err => console.error("Error al obtener clase:", err))
        }
        
    }
    
  }, [router.isReady, idClase]);
  const fechaHoy = new Date().toISOString().split('T')[0]
  const subirAsistencia = async(secuencia, periodo, idMateria, datoExtraido)=>{
    const res = await fetch('/api/asistir',{
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({secuencia:secuencia, periodo:periodo, idMateria:idMateria, boleta:datoExtraido})
    })
    if(res.ok){
      console.log('Jaló', res)
      router.reload()
    }else{
      console.log('No jaló', res)
    }
  }
  const modAsistencia= async(secuencia, periodo, idMateria, boleta, fecha, cambio)=>{
    const resp = await fetch('/api/asistir',{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({secuencia:secuencia, periodo:periodo, idMateria:idMateria, boleta:boleta, fecha:fecha, cambio: cambio})
    })
    if(resp.ok){
      console.log('Jaló', resp)
      router.reload()
    }else{
      console.log('No jaló', resp)
    }
  }
  
  return (
    <>
      <MainHead title={materia} />
      <div className={styles.container}>
      <MainAside grupos={grupos}/>
      <div className={styles.MainArea}>
        <div className={styles.tituloClase}>
            <h3>{`${materia} - ${secuencia}`}</h3>
          </div>
        <div style={{'display':'flex', 'justifyContent':'space-between'}} className={styles.classContainer}> {/* Contenedor de ambas columnas, izq=tabla de clase, der=scanner con lista de registros */}
          <div style={{'height':'75vh', 'maxHeight':'75vh',  'display':'flex', 'flexDirection':'column', 'marginLeft':'20px'}} className={styles.cuadroIzq}> {/* Lado izquierdo xd */}
          {type!==2?
          (
            <button className={styles.btnAddAlumno} style={{width: 'max-content'}} onClick={async () => {
              try {
                const nuevoInvitado = await generarInvitado(idClase);
                if (nuevoInvitado && nuevoInvitado !== "False") {
                  swal({
                    title: `Invitado generado: ${nuevoInvitado}`,
                    text: `El código será válido las siguientes 3 horas. Comparta este código con su invitado.`,
                    icon: "success",
                  });
                  alert('El código generado es: ',nuevoInvitado)
                } else {
                  swal({
                    title: "Error",
                    text: "No se pudo generar el invitado.",
                    icon: "error",
                  });
                }
              } catch (err) {
                console.error("Error generando invitado:", err);
                swal({
                  title: "Error",
                  text: "Hubo un problema al generar el invitado.",
                  icon: "error",
                });
              }
            }}
          >
            + Asistente
          </button>
          ):(<div></div>)}
            <table className={styles.Table}>
              <thead>
                <tr>
                  <th scope="col">N.L.</th>
                  <th scope="col">Boleta</th>
                  <th scope="col">Nombre Completo</th>
                  {fechas.map((fecha, indexFecha) =>(
                    <th key={indexFecha}>{fecha.Fecha}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, index) => (
                  <tr key={index}>
                    <th>{alumno.NumeroLista}</th>
                    <td>{alumno.Boleta}</td>
                    <td style={{'textAlign':'justify'}}>{alumno.Nombre}</td>
                    {fechas.map((fecha, i) => {
                      const asistencia = asistencias.find(
                        (a) => a.boleta === alumno.Boleta && a.fecha === fecha
                      )
                      return (
                        <td key={i} >
                          <center>
                          <button className={styles.btnCheck} onClick={()=>{
                              const boleta = alumno.Boleta
                              const fechaXD = new Date(fecha.Fecha).toISOString().split('T')[0]
                              const asistencia = asistencias.find(
                                (a) => a.Boleta === boleta && a.Fecha === fechaXD
                              )
                              const nuevaAsistencia = !asistencia?.Asistencia
                              modAsistencia(secuencia, periodo, idMateria, boleta, fechaXD, nuevaAsistencia)
                            }}
                          >
                            {(() =>{
                              const fechaXD = new Date(fecha.Fecha).toISOString().split('T')[0]
                              const asistencia = asistencias.find(
                                (a) => a.Boleta === alumno.Boleta && a.Fecha === fechaXD
                              )
                              return asistencia?.Asistencia ? asistencia.Hora || '✓' : ''
                            })()}
                        </button>
                        </center>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{'width':'250px','height':'75vh', 'maxHeight':'75vh', 'textAlign':'center'}} className={styles.scannerCont}> {/* Lado derecho xd */}
            <center>
            <div className={styles.scannerDiv}>
            <Scanner scanDelay={3000} allowMultiple={true}  onScan={async (result) =>{
              try {
                let xd = result[0].rawValue;
                const response = await fetch('/api/fetchHtml', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ url: xd }),
                })
                if (!response.ok) throw new Error('No se pudo leer la página');
                const data = await response.json()
                const htmlText = data.html;
                const regexd = /([0-9]{2}|PE)[0-9]{8}/; 
                const match = htmlText.match(regexd);
                if (match){
                  const datoExtraido = match[0].trim()
                  const boletaExiste = alumnos.some(
                    (alumno) => String(alumno.Boleta).trim() === datoExtraido
                  )
                  if (boletaExiste) {
                    setLista((prev) => [...prev, datoExtraido])
                    setBoletasEscaneadas((prev) =>
                      prev.includes(datoExtraido) ? prev : [...prev, datoExtraido]
                    )
                    swal({
                      icon: 'success',
                      title: `Boleta encontrada: ${datoExtraido}`,
                      text: fechaHoy,
                      timer: 2000,
                    })

                    subirAsistencia(secuencia, periodo, idMateria, datoExtraido)
                    }else{
                    alert('ERROR AL ESCANEAR / NO ENCONTRADA')
                    /*swal({
                      icon: 'warning',
                      title: `Boleta no encontrada: ${datoExtraido}`,
                      text: 'Este alumno no está en la lista',
                      timer: 2000,
                    })*/
                  }
                } else {
                  swal({
                    icon: 'warning',
                    title: 'No se encontró la boleta en el QR',
                    timer: 1500,
                  })
                }
              } catch (error) {
                console.error('Error leyendo el QR:', error);
                swal({
                  icon: 'error',
                  title: 'Error al leer el QR',
                  timer: 1500,
                })
              }
            }}
            />
          </div >
            <div>
            <ul>
            {[...new Set(lista)].map((boleta, index) => (
              <li key={index}>{boleta}</li>
            ))}
          </ul>
            </div> 
            </center>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
/* Si no me equivoco, sólo tienes que hacer la petición para el /api/asistir.js, es decir, la función que hace fetch a esa dirección sólo junta los datos requeridos, y la función de asistir.js que por cierto está mal xd, esa tiene que hacer fetch al url de HEROKU */