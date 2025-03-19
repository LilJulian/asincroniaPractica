// Importamos la función peticion desde el archivo "../solicitud/peticion.js"
import {peticion} from "../solicitud/peticion.js";

// Función asíncrona para obtener los álbumes de un usuario
export const getAlbums = async (URL, usuario) => {
  //Retorno de la peticion
  return await peticion(`${URL}/albums?=${usuario.id}`);
}