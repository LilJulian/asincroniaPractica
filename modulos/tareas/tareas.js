import {peticion} from "../solicitud/peticion.js";

export const getTareas = async (URL, competado) => {
  try {
    return await peticion(`${URL}/todos?completed=${competado}`)
  } catch (error) {
    alert("Solicitud no realizada");
  }
}