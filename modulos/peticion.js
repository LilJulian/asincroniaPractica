const peticion = async (URL) => {
  try {
    const pedir = await fetch(URL);
    const datos = await pedir.json();
    return datos;    
  } catch (error) {
    alert("Solicitud no encontrada");
  }
  
}

export default peticion;