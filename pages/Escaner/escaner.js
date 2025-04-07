import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function Escaner(){
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  useEffect(() =>{
    const qrcode = window.qrcode;
    if (!qrcode) {
      console.error("qrcode library not loaded");
      return;
    }
    qrcode.callback = (respuesta) =>{
      if (respuesta){
        Swal.fire(respuesta);
        activarSonido();
        cerrarCamara();
      }
    };
    encenderCamara();
    return () =>{
      cerrarCamara();
    };
  }, []);
  const encenderCamara = () =>{
    const video = videoRef.current;
    const canvas = canvasRef.current;
    navigator.mediaDevices
      .getUserMedia({ video:{ facingMode: 'environment' }})
      .then((stream) =>{
        setScanning(true);
        video.setAttribute('playsinline', true);
        video.srcObject = stream;
        video.play();
        tick();
        scan();
      });
  };
  const tick = ()=>{
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    if (video.readyState === video.HAVE_ENOUGH_DATA){
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    if (scanning){
      requestAnimationFrame(tick);
    }
  };
  const scan = () =>{
    try {
      window.qrcode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
  };
  const cerrarCamara = () =>{
    const video = videoRef.current;
    const stream = video.srcObject;
    if (stream){
      stream.getTracks().forEach((track) => track.stop());
    }
    setScanning(false);
  };
  const activarSonido = () =>{
    const audio = document.getElementById('audioScaner');
    if (audio) audio.play();
  };
  return(
    <div className="row justify-content-center mt-5">
      <div className="col-sm-4 shadow p-3">
        <h5 className="text-center">Escanear código QR</h5>
        <div className="row text-center">
          <button id="btn-scan-qr" onClick={encenderCamara} hidden={scanning}>
            <img
              src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/07/1499401426qr_icon.svg"
              className="img-fluid text-center"
              width="175"
              alt="Scan QR"
            />
          </button>
          <canvas ref={canvasRef} id="qr-canvas" className="img-fluid" hidden={!scanning}></canvas>
          <video ref={videoRef} hidden style={{ display: 'none' }}></video>
          <div className="row mx-5 my-3">
            <button className="btn btn-success btn-sm rounded-3 mb-2" onClick={encenderCamara}>
              Encender cámara
            </button>
            <button className="btn btn-danger btn-sm rounded-3" onClick={cerrarCamara}>
              Detener cámara
            </button>
          </div>
        </div>
      </div>
      <audio id="audioScaner" src="/beep.mp3" preload="auto"></audio>
    </div>
  );
}
