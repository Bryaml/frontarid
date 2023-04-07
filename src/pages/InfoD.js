import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarA from '../Navbars/NavbarA';

import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import api from '../services/api';

const InfoD = () => {
  const location = useLocation();
  const user = location.state.user;
  console.log('User:', user);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [formData, setFormData] = useState({
    nombre: user.nombre,
    apellidos: user.apellidos,
    email: user.email,
    // ... otros campos ...
  });
  // En el componente InfoD
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // Llama a la función para enviar el archivo al servidor
        await uploadImage(user.id, file);

        // Leer el archivo como base64 y actualizar el estado imageUrl
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageUrl(e.target.result);
        };
        reader.readAsDataURL(file);

      } catch (error) {
        console.error("Error al cargar la imagen:", error);
        // Puedes agregar lógica adicional aquí, como mostrar un mensaje de error
      }
    }
  };

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await api.get(`/api/administradores/${user.id}/imagen`, {
          responseType: "arraybuffer",
        });
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImageUrl(`data:image/png;base64,${base64}`);
        console.log('Imagen obtenida correctamente:', imageUrl);
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    }

    if (!imageUrl) {
      fetchImage();
    }
  }, [user.id, imageUrl]);

  // ...

  <img
    src={imageUrl}
    alt="Admin"
    className="rounded-circle"
    width="150"
  />




  async function uploadImage(userId, file) {
    const formData = new FormData();
    formData.append("imagen", file);

    try {
      const response = await api.post(`/api/administradores/${userId}/imagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Imagen cargada correctamente:', response.data);
      return response.data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error.response);
      throw error;
    }
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.put(
        `/api/administradores/${user.id}`,
        formData
      );
      if (response.status === 200) {
        // Actualizar la información del usuario
        user.nombre = formData.nombre;
        user.apellidos = formData.apellidos;
        user.email = formData.email;
        // ... otros campos ...
        alert('Información actualizada correctamente');
        handleCloseModal();
      } else {
        alert('Error al actualizar la información');
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      alert('Error al actualizar la información');
    }

  };

  return (
    <>
      <NavbarA user={user} />

      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Aquí puedes agregar el contenido de 'card-header' si lo necesitas. */}
            <div className="card-header" style={{ backgroundColor: "#03A693", color: "white" }}>
              <div className="d-flex justify-content-between bd-highlight">
                <div className="bd-highlight"></div>
                <div className="bd-highlight">
                  <h4>Mi Perfil</h4>
                </div>
                <div className="bd-highlight"> </div>
              </div>
            </div>
            <div className="card">
              {/* Aquí puedes agregar el contenido de 'container' si lo necesitas. */}
              <div className="container">
                <div className="main-body">
                  <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex flex-column align-items-center text-center">
                            <img
                              src={imageUrl || "https://bootdey.com/img/Content/avatar/avatar7.png"}
                              alt="Admin"
                              className="rounded-circle"
                              width="150"
                            />
                            <div className="mt-3">
                              <h4>scx</h4>
                              <p className="text-secondary mb-1">
                                Full Stack Developer
                              </p>
                              <p className="text-muted font-size-sm">
                                Bay Area, San Francisco, CA
                              </p>
                              <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                                <FontAwesomeIcon icon={faCamera} size="2x" />
                              </label>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                              />

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Nombre</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.username}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Apellidos</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.apellidos}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.email}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Rol</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.rol}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Telefono</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.telefono}
                            </div>

                          </div>
                          <hr />
                          <button onClick={handleShowModal}>Modificar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modal para actualizar información */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar información personal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Agrega aquí los campos del formulario */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos:</label>
              <input type="text" id="apellidos" name="apellidos" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            {/* ... otros campos ... */}
            <button type="submit">Guardar cambios</button>
          </form>
        </Modal.Body>
      </Modal>


    </>
  );
};

export default InfoD;
