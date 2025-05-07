'use client';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import styles from '@/styles/Home.module.css'
import { Router } from 'next/router';

const FileUploader = () => {
  const [file, setFile] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      swal({ title: 'Selecciona un archivo PDF', icon: 'warning' });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file); // el nombre debe coincidir con el parámetro en FastAPI

      const response = await axios.post(
        'https://upiicsara-225fbcffb78e.herokuapp.com/grupo/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      swal({ title: 'Archivo subido correctamente', icon: 'success' });
      console.log(response.data);

    } catch (error) {
      console.error('Error al subir el archivo:', error);
      swal({ title: 'Error al subir el archivo', icon: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={isLoading}
      /><br/>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        className={styles.btnAddAlumno}
      >
        {isLoading ? 'Subiendo...' : 'Subir PDF'}
      </button>
    </div>
  );
};

export default FileUploader;