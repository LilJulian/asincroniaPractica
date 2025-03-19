// Exportamos la función peticio desde el archivo ../solicitud/peticion.js"
import {peticion} from "../solicitud/peticion.js";

// Definimos una función asíncrona getPosts que recibe una URL y un objeto usuario opcional
export const getPosts = async (URL, usuario) => {
  //Definirmos la ruta
  let ruta = "";
  //Si se recibe un id enviara el post del id
  if (usuario) ruta = `${URL}/posts?=${usuario.id}`
  //Si no se recibe id enviara todos los post
  else ruta = `${URL}/posts`
  //Retorno de la peticion
  return await peticion(ruta);
}