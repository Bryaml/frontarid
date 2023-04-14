import axios from 'axios';

const Datadocencias = [];

axios.get('')
.then(function(response){
    console.log(response);
})
export const Data = [
    {
        name:"Docencia 1",
        incidencias:35
    },
    {
        name:"Docencia 2",
        incidencias:80
    },
    {
        name:"Docencia 3",
        incidencias:5
    },
    {
        name:"Docencia 4",
        incidencias:12
    },
    {
        name:"Docencia 5",
        incidencias:1
    }
]

export const DataDocentes=[
    {
        name:"Maximiliano Carsi Castrejon",
        incidencias:50
    },
    {
        name:"Miguel Moreno",
        incidencias:12
    },
    {
        name:"Hugo",
        incidencias:15
    }
]

export const DataAcademias=[
    {
        name:"DATID",
        incidencias:8
    },
    {
        name:"DACEA",
        incidencias:9
    }
]