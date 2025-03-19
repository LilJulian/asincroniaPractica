// Definimos una función asíncrona llamada peticio que recibe una URL como parámetro
export const peticion = async (URL) => {
  
    //Realizar la solicitud
    const pedir = await fetch(URL);
    //Convertir la solicitud a archivo json y la guardamos en "datos"
    const datos = await pedir.json();
    //Retornar datos
    return datos;    
}
