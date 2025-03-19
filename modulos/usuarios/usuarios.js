// Importamos la función peticion desde el archivo peticion.js dentro de la carpeta 'solicitud'
import {peticion} from "../solicitud/peticion.js";

// Definimos una función asíncrona getUsuarios que recibe una URL y un id 
export const getUsuarios = async (URL, id) => {
  // Declaramos una variable 'ruta' que almacenará la URL de la petición
  let ruta = "";
  // Si tiene id, enviamos la url para filtrar por ese usuario en específico
  if (id) ruta = `${URL}/users?id=${id}`
  //Si no obtenemos todos los usuarios
  else ruta = `${URL}/users`
  //Llamamos la funcion 'Peticion' para hacer la peticion
  const usuarios = await peticion(ruta);
  //Retornamos la peticion
  return usuarios;
}