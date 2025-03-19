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
    const tareas = todasTareas.filter((tarea)=> tarea.userId === usuario.id)
    //Retornos los usuarios y las tareas
    return {...usuario, tareas}
  }))
}

//Funcion asincrona para ingresar el nombre del usuario por teclado luego filtrar el usuario que coincidad con su album y sus fotos
const consulUser = async () => {
  //Ingresar por teclado el nombre de usuario
  let askUsername = prompt('Ingrese el nombre del usuaro');
  //Obtener los usuarios
  const usuarios = await obj.getUsuarios(obj.URL);
  //Metodo para filtrar los usuarios que coincidan con el dato de entrada con filter()
  const username = usuarios.filter(usuario => usuario.username.toLowerCase().includes(askUsername));
  //Recorrer cada usuario con el metodo map , para obtener los albums
  return await Promise.all(username.map(async (usuario) => {
    //Obtenere los albums
    const albums = await obj.getAlbums(obj.URL, usuario);
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
}

//Funcion asincorna que ingresa el nombre del post, luego filtra los post que coincida con el dato de entrada y mostrara sus respectivos comentarios
const obtenerPost = async () => {
  //Ingresar por teclado el nombre del post
  let askTittle = prompt('Ingrese el nombre del post completo');
  //Obtener los posts
  const posts = await obj.getPosts(obj.URL);
  //Filtrar los posts que coincidan el titulo con el dato de entrada con el metodo filter
  const titulo = obj.getPostTitulo
  //Recorrer cada titulo con el metodo map, para obtener los comentarios
  return await Promise.all(titulo.map(async (post) => {
    //Obtener los comentarios
    const coments = await obj.getComents(obj.URL, post)
    //Retornar los post con sus respectivos comentarios
    return { ...post, coments }
  }));
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
      - Ver usuarios con tareas no completadas
      - Buscar usuario por nombre y ver sus álbumes y fotos
      - Buscar post por título y ver comentarios
      - Ver solo nombres y teléfonos de usuarios
      - Obtener toda la información de los usuarios
      - Salir`
    ));


    // Elegir la opcion seleccionada
    switch (opcion) {
      case 1:
        console.log("Usuarios con tareas no completadas:");
        console.log(await soliTareas());
        break;

      case 2:
        console.log("Buscar usuario y mostrar álbumes con fotos:");
        console.log(await consulUser());
        break;

      case 3:
        console.log("Buscar post y mostrar comentarios:");
        console.log(await obtenerPost());
        break;

      case 4:
        console.log("Mostrar solo nombres y teléfonos de usuarios:");
        console.log(await soliUsuario());
        break;

      case 5:
        console.log("Obtener toda la información de los usuarios:");
        console.log(await manejarDatos());
        break;

      case 0:
        console.log("Saliendo");
        return; 

      default:
        alert("Numero no encontrado");
        false;
    }
  }
};

// Llamar a la función del menú
mostrarMenu();