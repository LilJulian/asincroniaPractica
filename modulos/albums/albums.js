import {peticion} from "../solicitud/peticion.js";

export const getAlbums = async (URL, usuario) => {
  return await peticion(`${URL}/albums?=${usuario.id}`);
}