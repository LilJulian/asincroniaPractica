//Importacion de los modulos para obtener las distintas peticiones
import * as obj from "./modulos/index.js";

//Funcion asincorna que espera obtener los usuarios,  para luego recorrer cada usuario y obtener los usuarios con tareas no completadas
const soliTareas = async () => {
  //Obtener los usuarios
  const usuarios = await obj.getUsuarios(obj.URL);
  //Obtener las tareas que no esten completada
  const todasTareas = await obj.getTareas(obj.URL, false);
  //Recorrer cada usuario con el metodo map, para obtener a  las tareas
  return await Promise.all(usuarios.map(async (usuario) => {
    //Filtrar unicamente los datos que coincidan con el id de usuario
    const tareas = todasTareas.filter((tarea)=> tarea.userId === usuario.id)
    //Retornos los usuarios y las tareas
    return {...usuario, tareas}
  }))
}

//Funcion asincrona para ingresar el nombre del usuario por teclado luego filtrar el usuario que coincidad con su album y sus fotos
const consulUser = async () => {
  //Intentar el siguiente bloque de codigo
  try{
  //Ingresar por teclado el nombre de usuario
  let askUsername = prompt('Ingrese el nombre del usuaro');
  //Obtener los usuarios
  const usuarios = await obj.getUsuarios(obj.URL);
  //Metodo para filtrar los usuarios que coincidan con el dato de entrada con filter()
  const username = await obj.getAlbumId(usuarios,askUsername);
  //Recorrer cada usuario con el metodo map , para obtener los albums
  return await Promise.all(username.map(async (usuario) => {
    //Obtenere los albums
    const albums = await obj.getAlbums(obj.URL, usuario);
    //Filtrar unicamente los datos que coincidan con el id de usuario
    const userAlbums = albums.filter(album => album.userId === usuario.id)
    //Recorrer cada album con el metodo map, para obtener las fotos
    const photosAlbums = await Promise.all(userAlbums.map(async (album) => {
      //Obtener las fotos
      const photos = await obj.getPhotos(obj.URL, album.id)
      //Retornar los albums con sus respectivas fotos
      return { ...album, photos }
    }))    
    //Retornar ls usuarios con sus albums y fotos
    return {...usuario, photosAlbums}
  }));
  //Capturar el error y mostrarlo
  }catch (error){
    alert("nombre de usuario desconocido", error.message);
  }
}

//Funcion asincorna que ingresa el nombre del post, luego filtra los post que coincida con el dato de entrada y mostrara sus respectivos comentarios
const obtenerPost = async () => {
  //Intentar el siguiente bloque de codigo
  try{
  //Ingresar por teclado el nombre del post
  let askTittle = prompt('Ingrese el nombre del post');
  //Obtener los posts
  const posts = await obj.getPosts(obj.URL);
  //Filtrar los posts que coincidan el titulo con el dato de entrada con el metodo filter
  const titulo = await obj.getPostTitulo(posts, askTittle)
  //Recorrer cada titulo con el metodo map, para obtener los comentarios
  return await Promise.all(titulo.map(async (post) => {
    //Obtener los comentarios
    const coments = await obj.getComents(obj.URL, post)
    //Retornar los post con sus respectivos comentarios
    return { ...post, coments }
  }));
  //Capturar el error y mostrarlo
  }catch(error){
    alert("nombre de post desconocido", error.message);
  }
}

//Funcion asincrona que obtiene los usuarios y mostrara unicamentr el nombre y telefono por cada usuario
const soliUsuario = async () => {
  //Obtener los usuarios
  const usuarios = await obj.getUsuarios(obj.URL);
  //Recorrer los usuarios con el metodo map, para obtener el nombre y telefono de cada usuario
  return await Promise.all(usuarios.map(async (usuario) => {
    //Asignar el elemento name del usuario a una variable constante
    const name = usuario.name;
    //Asignar el elemento phone del usuario a una variable constante
    const phone = usuario.phone;
    //Asignar el arreglo del nombre y telefono de cada  usuario a una variable

    //retorno del arreglo
      return {name, phone}
  })); 
}


const manejarDatos = async () => {
  //Variable constante para obtener los usuarios                                     
  const usuarios = await obj.getUsuarios(obj.URL,);
  //Funcion map para recorrer cada usuario esperando que se cumpla el arreglo de promesas(usuarios) usando Promise.all                           
  return await Promise.all(usuarios.map(async (usuario) => {
    //Variable constante para obtener los post por usuario                                                                           
    const posts = await obj.getPosts(obj.URL, usuario);
    //Variable constante para que por cada post obtenga los comentarios             
    const comentPost = await Promise.all(posts.map(async (post) => {
      //Variable constante para obtener los comentarios del post que este recorriendo
      const coments = await obj.getComents(obj.URL, post);
      //Retorna los posts con sus respectivos comentario       
      return { ...post, coments };
    }));
    //Variable constante para obtener albums por usuario 
    const albums = await obj.getAlbums(obj.URL, usuario);
    //Variable constante para que por cada album obtenga los photos  
    const photosAlbums = await Promise.all(albums.map(async (album) => {
      //Variable constante para obtener los photos del album que este recorriendo
      const photos = await obj.getPhotos(obj.URL, album)
      //Retorna los albums con sus respectivos photos   
      return { ...album, photos }
    }))

    //Retorna los usuarios con sus posts y sus albums
    return { ...usuario, comentPost, photosAlbums };
  }));
};

const mostrarMenu = async () => {
  while (true) {
    // Solicitar la opción 
    let opcion = parseInt(prompt(
      `Seleccione una opción:
      1- Ver usuarios con tareas no completadas
      2- Buscar usuario por nombre y ver sus álbumes y fotos
      3- Buscar post por título y ver comentarios
      4- Ver solo nombres y teléfonos de usuarios
      5- Obtener toda la información de los usuarios
      0- Salir`
    ));


    // Elegir la opcion seleccionada
    switch (opcion) {
      //Ejecutar el ejercicio 1 y terminarlo
      case 1:
        console.log("Usuarios con tareas no completadas:");
        console.log(await soliTareas());
        break;
      //Ejecutar el ejercicio 2 y terminarlo
      case 2:
        console.log("Buscar usuario y mostrar álbumes con fotos:");
        console.log(await consulUser());
        break;
      //Ejecutar el ejercicio 3 y terminarlo
      case 3:
        console.log("Buscar post y mostrar comentarios:");
        console.log(await obtenerPost());
        break;
      //Ejecutar el ejercicio 1 y terminarlo
      case 4:
        console.log("Mostrar solo nombres y teléfonos de usuarios:");
        console.log(await soliUsuario());
        break;
      //Ejecutar el ejercicio 1 y terminarlo
      case 5:
        console.log("Obtener toda la información de los usuarios:");
        console.log(await manejarDatos());
        break;
      //Termina el programa y no retorna nada
      case 0:
        console.log("Saliendo");
        return;
      //Avisa si la opcion es diferente de 0-5
      default:
        alert("Numero no encontrado");
    }
  }
};

// Llamar a la función del menú
mostrarMenu();


