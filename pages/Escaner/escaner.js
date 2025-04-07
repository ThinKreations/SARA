import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import jsQR from 'jsqr';

export default function Escaner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const btnScanRef = useRef(null);
  const scanningRef = useRef(false);

  const [isClient, setIsClient] = useState(false);

  // Aseguramos que solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const activarSonido = () => {
    const audio = document.getElementById('audioScaner');
    if (audio) audio.play();
  };

  const cerrarCamara = () => {
    const video = videoRef.current;
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
    scanningRef.current = false;
    if (canvasRef.current) canvasRef.current.hidden = true;
    if (btnScanRef.current) btnScanRef.current.hidden = false;
  };

  const encenderCamara = () => {
    if (!isClient) return; // No ejecutar si no estamos en el cliente

    const video = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvas = canvasElement.getContext('2d');
    const btnScanQR = btnScanRef.current;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      scanningRef.current = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute('playsinline', true);
      video.srcObject = stream;
      video.play();

      const tick = () => {
        if (!scanningRef.current) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvasElement.height = video.videoHeight;
          canvasElement.width = video.videoWidth;
          canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
          const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            Swal.fire(code.data);
            activarSonido();
            cerrarCamara();
            return;
          }
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  // Si estamos en el servidor, no hacemos nada
  if (!isClient) {
    return null; // Evitar renderizado en servidor
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-sm-4 shadow p-3">
        <h5 className="text-center">Escanear código QR</h5>
        <div className="row text-center">
          <a id="btn-scan-qr" ref={btnScanRef} href="#" onClick={(e) => { e.preventDefault(); encenderCamara(); }}>
            <img
              src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/07/1499401426qr_icon.svg"
              className="img-fluid text-center"
              width="175"
            />
          </a>
          <canvas hidden ref={canvasRef} id="qr-canvas" className="img-fluid"></canvas>
          <video ref={videoRef} style={{ display: 'none' }}></video>
          <div className="row mx-5 my-3">
            <button className="btn btn-success btn-sm rounded-3 mb-2" onClick={encenderCamara}>Encender cámara</button>
            <button className="btn btn-danger btn-sm rounded-3" onClick={cerrarCamara}>Detener cámara</button>
          </div>
        </div>
        <audio id="audioScaner" src="/beep.mp3" preload="auto"></audio>
      </div>
    </div>
  );
}