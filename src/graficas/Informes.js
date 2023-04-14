import React, { useState } from 'react';
import NavbarA from '../Navbars/NavbarA';
import { Mapa } from '../graficas/Mapa';
import { InformeDocencias } from '../graficas/InformeDocencias';
import { InformeDocentes } from '../graficas/InformeDocentes';
import {InformeDivisionAcademica }from '../graficas/InformeDivisionAcademica';
import { useLocation } from 'react-router-dom';

export const Informes = () => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAulaLabModal, setShowAulaLabModal] = useState(false);
    const handleShowUserModal = () => setShowUserModal(true);
    const handleCloseUserModal = () => setShowUserModal(false);
    const handleShowAulaLabModal = () => setShowAulaLabModal(true);
    const handleCloseAulaLabModal = () => setShowAulaLabModal(false);
    const location = useLocation();
    const user = location.state ? location.state.user : { email: '', roles: '' };
    const [filtroSelected, setFiltroSelected] = useState();

    const filtro1 = () => {
        setFiltroSelected(1)
    }

    const filtro2 = () => {
        setFiltroSelected(2)
    }

    const filtro3 = () => {
        setFiltroSelected(3)
    }

    return (
        <div>
             <NavbarA user={user}
        handleShowUserModal={handleShowUserModal}
        handleShowAulaLabModal={handleShowAulaLabModal}
      />
            <div style={{ margin: 15, textAlign: "center", fontSize: 40, fontFamily: 'sans-serif', color: "#224e76" }}>
                Modulo Estadístico
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: "50%", marginTop: 55 }}>
                    <Mapa />
                </div>
                <div style={{ width: "50%" }}>
                    <div>
                        {/* BOTONES PARA LOS FILTROS (docencias,docentes,areas academicas) */}
                        <div style={{ textAlign: 'center' }}>
                            <button onClick={filtro1} style={{ borderRadius: 50, margin: 5, backgroundColor: "#049474", color: "#fff", padding:8, paddingLeft:20,paddingRight:20}}>Docencias</button>
                            <button onClick={filtro2} style={{ borderRadius: 50, margin: 5, backgroundColor: "#224e76", color: "#fff", padding:8, paddingLeft:20,paddingRight:20}}>Docentes</button>
                            <button onClick={filtro3} style={{ borderRadius: 50, margin: 5, backgroundColor: "#3c7c8c", color: "#fff", padding:8, paddingLeft:20,paddingRight:20}}>División acedemica</button>
                        </div>
                        <div style={{height:"50%"}}>
                            {filtroSelected==1 ? <InformeDocencias/>:''}
                            {filtroSelected==2 ? <InformeDocentes/>:''}
                            {filtroSelected==3 ? <InformeDivisionAcademica/>:''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
