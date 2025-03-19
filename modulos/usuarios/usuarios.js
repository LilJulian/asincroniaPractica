import {peticion} from "../solicitud/peticion.js";

export const getUsuarios = async (URL, id) => {
  let ruta = "";
  if (id) ruta = `${URL}/users?id=${id}`
  else ruta = `${URL}/users`
  const usuarios = await peticion(ruta);
  return usuarios;
}