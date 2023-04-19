import React, { useState,useEffect } from 'react';
import { PieChart } from '../graficas/PieChart';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Data } from '../graficas/Data';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import autoTable from 'jspdf-autotable'

Chart.register(CategoryScale);

export const InformeDocencias = () => {


  //GENERAR GRAFICA
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.name),
    datasets: [
        {
          //DESCRIPCIÓN DE LA GRAFICA
            label: "Numero de incidencias",
            //MAPEO DE LOS DATOS
            data: Data.map((data) => data.incidencias),
            //PALETA DE COLORES PARA LA GRAFICA
            backgroundColor: [
                "#08B731",
                "#08A6B7",
                "#271AD7",
                "#D01AD7",
                "#F38D26",
                "#F32626"
            ],
            borderColor: "black",
            borderWidth: 0.5, //GROSOR DEL BORDE DE LA GRAFICA
            // radius:100     //CONFIGURACIÓN PARA AJUSTAR EL TAMAÑO DEL CIRCULO (hay errores de tamaño)
        }
    ]
});


//GENERAR ARCHIVO EXCEL
const generateExcel=()=>{

  //-------  GENERAR TABLA CON DATOS OBTENIDOS  ----------
  const sheet = XLSX.utils.json_to_sheet(Data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,sheet,"Docencias");
  //------------------------------------------------------

  const tiempoTrascurrido = Date.now();
  const fecha = new Date(tiempoTrascurrido);
  const hoy = fecha.toDateString();
  XLSX.writeFile(wb,`Informe docencias - ${hoy}.xlsx`);
}

//GENERAR PDF
const generatePDF = ()=>{
  const canvas = document.querySelector('canvas');
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  //TITULO DEL DOCUMENTO
//  pdf.text("Informe de docencias",0,0);
  //IMAGEN DE LA GRAFICA
  pdf.addImage(imgData,'PNG',40,60,120,120);
  //TABLA CON DATOS
  const headers = [['Docencia','Numero de incidencias']];
  const datos = Data.map(item=>[item.name,item.incidencias]);
  pdf.autoTable({head:headers,body:datos});

  const tiempoTranscurrido = Date.now();
  const fecha = new Date(tiempoTranscurrido);
  const hoy = fecha.toDateString();
  pdf.save(`Informe-${hoy}.pdf`)
}





  return (
    <div>
        <PieChart chartData={chartData} />
        <div style={{display:'flex'}}>
          <div style={{width:"50%", textAlign:"center"}}>
            <button onClick={generatePDF} style={{margin:30,backgroundColor:"#9F1D1D",color:"#fff", borderRadius:20,padding:8}}>Descargar PDF</button>
          </div>
          <div style={{width:"50%",textAlign:'center'}}>
            <button onClick={generateExcel} style={{margin:30, backgroundColor:"#269315",color:"#fff",borderRadius:20,padding:8}}>Descargar XMLS</button>
          </div>
        </div>
    </div>
  )
}
