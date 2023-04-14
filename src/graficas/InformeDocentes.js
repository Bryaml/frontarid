import React, { useState, useEffect } from 'react';
import { PieChart } from '../graficas/PieChart';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import axios from 'axios';

import jsPDF from 'jspdf';
import * as XLSX from "xlsx";

Chart.register(CategoryScale);

export const InformeDocentes = () => {

  //ALMACENAR LOS DATOS DEL SERVICIO--
  const [datosApi, setDatosApi] = useState([])

  const [chartData, setchartData] = useState({
    //ETIQUETA A QUIEN SE HACE LA REFERENCIA DE CADA PARTICIÓN DE LA GRAFICA
    labels: datosApi.map(item => item.name),
    // labels: DataDocentes.map((data) => data.name),
    datasets: [
      {
        label: "Numero de incidencias",
        data: datosApi.map((data) => data.incidencias),
        backgroundColor: [
          "#08B731",
          "#08A6B7",
          "#271AD7",
          "#D01AD7",
          "#F38D26",
          "#F32626"
        ],
        borderColor: "black",
        borderWidth: 0.5
      }
    ]
  });

  const generateExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(datosApi);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Docentes");
    const tiempoTrascurrido = Date.now();
    const fecha = new Date(tiempoTrascurrido);
    const hoy = fecha.toDateString();
    XLSX.writeFile(wb, `Informe docentes - ${hoy}.xlsx`);
  }

  const generatePDF = async () => {
    const canvas = document.querySelector('canvas');
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 40, 60, 120, 120);
    const headers = [['Docente', 'Numero de incidencias']];
    // await axios.get('http://localhost:8080/incidencias/incidencias-por-docente')
    // .then(response=>{
    //   const data = Object.entries(response.data).map(([name,incidencias])=>({name,incidencias}));
    //   setDatosApi(data)
    // })
      // console.log('DATOS API',datosApi)
    const datos = datosApi.map(item => [item.name, item.incidencias]);
    pdf.autoTable({ head: headers, body: datos });

    const tiempoTranscurrido = Date.now();
    const fecha = new Date(tiempoTranscurrido);
    const hoy = fecha.toDateString();
    pdf.save(`Informe docentes - ${hoy}.pdf`);
  }

  useEffect(() => {
    axios.get('http://localhost:8080/incidencias/incidencias-por-docente')
      .then(response => {
        const data = Object.entries(response.data).map(([name, incidencias]) => ({ name, incidencias }));
        setDatosApi(data)
      
        setchartData(prevState => ({
          ...prevState,
          labels: data.map(item => item.name),
          datasets: [{ ...prevState.datasets[0], data: data.map(item => item.incidencias) }]
        }));
      });
  }, []);

  return (
    <div>
      <PieChart chartData={chartData} />
      <div style={{ display: 'flex' }}>
        <div style={{ width: "50%", textAlign: "center" }}>
          <button onClick={generatePDF} style={{ margin: 30, backgroundColor: "#9F1D1D", color: "#fff", borderRadius: 20, padding: 8 }}>Descargar PDF</button>
        </div>
        <div style={{ width: "50%", textAlign: 'center' }}>
          <button onClick={generateExcel} style={{ margin: 30, backgroundColor: "#269315", color: "#fff", borderRadius: 20, padding: 8 }}>Descargar XMLS</button>
        </div>
      </div>
    </div>
  )
}