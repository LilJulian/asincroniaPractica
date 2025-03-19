// Importamos la función peticion desde el archivo "../solicitud/peticion.js"
import {peticion} from "../solicitud/peticion.js";

// Definimos una función asíncrona "getComents" que recibe una URL y un objeto post
export const getComents = async (URL, post) => {
  //Retorna la peticion hecha
  return await peticion(`${URL}/comments?postId=${post.id}`)
}