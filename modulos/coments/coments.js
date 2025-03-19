import {peticion} from "../solicitud/peticion.js";

export const getComents = async (URL, post) => {
  return await peticion(`${URL}/comments?postId=${post.id}`)
}