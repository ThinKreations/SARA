import { useRouter } from 'next/router';  // Usar useRouter
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import MainAside from "@/components/MainHeader";
import { Scanner } from '@yudiel/react-qr-scanner';
import LogIn from "@/components/LogIn";
import swal from 'sweetalert';
const inter = Inter({ subsets: ["latin"] });
import { useState, useEffect } from 'react';

export default function Clase({clase}){
  const router = useRouter();
  const {idClase} = router.query;

  const [lista,setLista]=useState([]);
  const [isLogged, setIsLogged]=useState(null)
  const [grupos, setGrupos] = useState([])

  useEffect(() =>{
    const logged = localStorage.getItem('isLogged');
    if (logged !== 'true'){
      router.replace('/'); // Redirigir sin historial
      swal({ title: "Inicia Sesión", icon: "error" });
      
    } else {
      setIsLogged(true);
      fetch('../api/clases/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setGrupos(data))
        .catch((err) => console.error('Error al obtener grupos:', err))
    }
  }, [router]);
  return (
    <>
      <MainHead title='SARA' />
      <div className={styles.container}>
      <MainAside grupos={grupos}/>
      <div className={styles.MainArea}>
        <div className={styles.tituloClase}>
            <h2>{`Unidad de Aprendizaje - Secuencia`}</h2>
          </div>
        <div style={{'display':'flex', 'justifyContent':'space-between'}}> {/* Contenedor de ambas columnas, izq=tabla de clase, der=scanner con lista de registros */}
          <div style={{'height':'75vh', 'maxHeight':'75vh',  'display':'flex', 'flexDirection':'column', 'marginLeft':'20px'}}> {/* Lado izquierdo xd */}
            <button className={styles.btnAddAlumno}><b>+ Alumno</b></button>
            <table className={styles.Table}>
              <thead>
                <tr>
                  <th scope="col">N.L.</th>
                  <th scope="col">Boleta</th>
                  <th scope="col">Nombre Completo</th>
                  <th scope="col">03/04</th> {/* Estos son los q se generan automáticamente xd */}
                </tr>
              </thead>
              <tbody>
                {
                  (
                    <tr>
                  <th>1</th>
                  <td>2024600000</td>
                  <td>Juárez Castillo Rubén Gabriel</td>
                  <td>
                    <center>
                      <input
                        type="checkbox"
                        className={styles.check}
                      />
                    </center>
                  </td>
                </tr>
                  )
                }
                
              </tbody>
            </table>
          </div>
          <div style={{'width':'250px','height':'75vh', 'maxHeight':'75vh','borderLeft':'1px solid rgb(200,200,200)', 'textAlign':'center'}}> {/* Lado derecho xd */}
            <center>
            <div className={styles.scannerDiv}>
            <Scanner scanDelay={2500} allowMultiple={true} onScan={async (result) =>{
              try {
                let xd = result[0].rawValue
                const response = await fetch('/api/fetchHtml', {
                  method: 'POST',
                  headers: {
                    'Content-Type':'application/json',
                  },
                  body: JSON.stringify({url: xd}),
                })

                if (!response.ok){
                  throw new Error('No se pudo leer la página')
                }
                const data = await response.json()
                const htmlText = data.html
                const regexd = /([0-9][0-9]|PE)[0-9]{8}/; {/* Aquí está la regex de boleta, 2 numeros del 0 al 9 o "PE", posteriormente, 8 números del 0 al 9 */}
                const match = htmlText.match(regexd)
                if (match){
                  const datoExtraido = match[0]
                  console.log('Boleta:', datoExtraido)
                  setLista(prev =>[...prev, datoExtraido]);{/* Aquí se agregan a una lista para imprimirlos debajo del scanner, elemento meramente visual */} 
                  swal({
                    icon: 'success',
                    title: `Boleta: ${datoExtraido}`,
                    timer: 2000,
                  });

                } else {
                  console.log('No se encontró el dato')
                  swal({
                    icon: 'warning',
                    title: 'No se encontró el dato',
                    timer: 1500,
                  })
                }
              } catch (error){
                console.error('Error leyendo el QR:', error)
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
              {lista.map((boleta, index)=>(
                <li key={index}>{boleta}</li>
              ))}{/* Aquí ps se imprimen los que vayan pasando lista */}
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
