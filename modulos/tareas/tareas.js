// Importamos la función peticion desde el archivo peticion.js dentro de la carpeta 'solicitud'
import {peticion} from "../solicitud/peticion.js";

// Definimos una función asíncrona getTareas que recibe una URL y un estado de completado (true o false)
export const getTareas = async (URL, competado) => {
  //Intentamos la siguiente linea de codigo
  try {
    //Llamamos el metodo peticion hacer la peticion
    return await peticion(`${URL}/todos?completed=${competado}`)
    //Si falla la peticion mostrara una alerta
  } catch (error) {
    alert("Estado no reconocido");
  }
}