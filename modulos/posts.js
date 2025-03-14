import peticion from "./peticion.js";

export const getPosts = async (URL, usuario) => {
  let ruta = "";
  if (usuario) ruta = `${URL}/posts?=${usuario.id}`
  else ruta = `${URL}/posts`
  return await peticion(ruta);
}