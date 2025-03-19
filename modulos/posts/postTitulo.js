// Exportamos la función peticion desde el archivo "../solicitud/index.js"
export { peticion } from "../solicitud/index.js";

// Definimos una función asíncrona getPostTitulo que recibe un array de posts y un datoEntrada como parámetros
export const getPostTitulo = async (posts, datoEntrada) => {
    // Filtramos los posts que el titulo título incluya datoEntrada
    return await posts.filter(post => post.title.toLowerCase().includes(datoEntrada.toLowerCase()));
}