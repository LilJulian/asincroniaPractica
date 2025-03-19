// Importamos la función peticion desde el archivo "../solicitud/peticion.js"
export { peticion } from "../solicitud/index.js";


// Definimos una función asíncrona "getAlbumId" que recibe un usuario y un dato de entrada
export const getAlbumId = async (usuarios, datoEntrada) => {
    // Filtramos los posts que el usuario incluya datoEntrada
    return await  usuarios.filter(usuario => usuario.username.toLowerCase().includes(datoEntrada.toLowerCase()));
}