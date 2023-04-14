import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 10000, 
});
async function assignTechnicianToIncidencia(incidenciaId, emailTecnico) {
  try {
    const response = await api.put(`/incidencias/${incidenciaId}/asignar-tecnico?emailTecnico=${emailTecnico}`);
    return response.data;
  } catch (error) {
    console.error('Error al asignar el técnico a la incidencia:', error.response);
    throw error;
  }
}
async function adminAcceptIncidencia(incidenciaId, emailAdmin) {
  try {
    const response = await api.post(`/incidencias/admin/aceptar-incidencia?id=${incidenciaId}&emailAdmin=${emailAdmin}`);
    return response.data;
  } catch (error) {
    console.error('Error al aceptar la incidencia por el administrador:', error.response);
    throw error;
  }
}
export default api;
export { assignTechnicianToIncidencia };
export { adminAcceptIncidencia };
