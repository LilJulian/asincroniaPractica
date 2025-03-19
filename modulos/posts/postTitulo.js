export { peticion } from "../solicitud/index.js";

export const getPostTitulo = async (posts, datoEntrada) => {
    return await posts.filter(post => post.title.toLowerCase().includes(datoEntrada.toLowerCase()));
}

