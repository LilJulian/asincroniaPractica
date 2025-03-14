import peticion from "./peticion.js";

export const getPhotos = async (URL, album) => {
  try {
    return await peticion(`${URL}/photos?albumId=${album.id}`)    
  } catch (error) {
    alert("solicitud no encontrada")
  }
}