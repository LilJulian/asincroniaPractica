import {peticion} from "../solicitud/peticion.js";

export const getPhotos = async (URL, album) => {
  return await peticion(`${URL}/photos?albumId=${album.id}`)    
}