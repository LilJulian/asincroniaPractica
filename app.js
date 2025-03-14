//Importacion de los modulos para obtener las distintas peticiones
import { getPosts, getUsuarios, getAlbums,getPhotos, getComents, getTareas } from "./modulos/index.js";
//Constante de el cuerpo de la url a usar
const URL = "https://jsonplaceholder.typicode.com";


//Funcion asincorna que espera obtener los usuarios,  para luego recorrer cada usuario y obtener los usuarios con tareas no completadas
const soliTareas = async () => {
  //Obtener los usuarios
  const usuarios = await getUsuarios(URL);
  //Recorrer cada usuario con el metodo map, para obtener a  las tareas
  return await Promise.all(usuarios.map(async (usuario) => {
    //Obtener las tareas que no esten completada
    const tareas = await getTareas(URL, false);
    //Retornos los usuarios y las tareas
    return {...usuario, tareas}
  }))
}

//Funcion asincrona para ingresar el nombre del usuario por teclado luego filtrar el usuario que coincidad con su album y sus fotos
const consulUser = async () => {
  //Ingresar por teclado el nombre de usuario
  let askUsername = prompt('Ingrese el nombre del usuaro');
  //Obtener los usuarios
  const usuarios = await getUsuarios(URL);
  //Metodo para filtrar los usuarios que coincidan con el dato de entrada con filter()
  const username = usuarios.filter((usuario) => usuario.username == askUsername);
  //Recorrer cada usuario con el metodo map , para obtener los albums
  return await Promise.all(username.map(async (usuario) => {
    //Obtenere los albums
    const albums = await getAlbums(URL, usuario);
    //Recorrer cada album con el metodo map, para obtener las fotos
    const photosAlbums = await Promise.all(albums.map(async (album) => {
      //Obtener las fotos
      const photos = await getPhotos(URL, album)
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
  const posts = await getPosts(URL);
  //Filtrar los posts que coincidan el titulo con el dato de entrada con el metodo filter
  const titulo = posts.filter((post) => post.title == askTittle);
  //Recorrer cada titulo con el metodo map, para obtener los comentarios
  return await Promise.all(titulo.map(async (post) => {
    //Obtener los comentarios
    const coments = await getComents(URL, post)
    //Retornar los post con sus respectivos comentarios
    return { ...post, coments }
  }));
 
}

//Funcion asincrona que obtiene los usuarios y mostrara unicamentr el nombre y telefono por cada usuario
const soliUsuario = async () => {
  //Obtener los usuarios
  const usuarios = await getUsuarios(URL);
  //Recorrer los usuarios con el metodo map, para obtener el nombre y telefono de cada usuario
  return await Promise.all(usuarios.map(async (usuario) => {
    //Asignar el elemento name del usuario a una variable constante
    const nombre = usuario.name;
    //Asignar el elemento phone del usuario a una variable constante
    const telefono = usuario.phone;
    //Asignar el arreglo del nombre y telefono de cada  usuario a una variable
    const element = [`nombre: ${nombre} telefono: ${telefono}\n`];
    //retorno del arreglo
      return element
  }))
  
}


const manejarDatos = async () => {
  //Variable constante para obtener los usuarios                                     
  const usuarios = await getUsuarios(URL,);
  //Funcion map para recorrer cada usuario esperando que se cumpla el arreglo de promesas(usuarios) usando Promise.all                           
  return await Promise.all(usuarios.map(async (usuario) => {
    //Variable constante para obtener los post por usuario                                                                           
    const posts = await getPosts(URL, usuario);
    //Variable constante para que por cada post obtenga los comentarios             
    const comentPost = await Promise.all(posts.map(async (post) => {
      //Variable constante para obtener los comentarios del post que este recorriendo
      const coments = await getComents(URL, post);
      //Retorna los posts con sus respectivos comentario       
      return { ...post, coments };
    }));
    //Variable constante para obtener albums por usuario 
    const albums = await getAlbums(URL, usuario);
    //Variable constante para que por cada album obtenga los photos  
    const photosAlbums = await Promise.all(albums.map(async (album) => {
      //Variable constante para obtener los photos del album que este recorriendo
      const photos = await getPhotos(URL, album)
      //Retorna los albums con sus respectivos photos   
      return { ...album, photos }
    }))

    //Retorna los usuarios con sus posts y sus albums
    return { ...usuario, comentPost, photosAlbums };
  }));
};

//Ciclo repetitivo para ejecutar la funcion del ejercicio que se requiera ejecutar
while (true) {
    //Datos de entrada para seleccinar el ejercicio
    let elige = parseInt(prompt(`Ingrese 1 para ejecutar el ejercicio 1
    Ingrese 2 para ejecutar el ejercicio 2
    Ingrese 3 para ejecutar el ejercicio 3
    Ingrese 4 para ejecutar el ejercicio 4
    Ingrese 5 para ejecutar el ejercicio 5
    Ingrese 0 para salir
    Al seleccionar el numero, escriba 0 para ver por la consola`));
     if (await elige == 1) {            //Si elije es igual a 1 entonces ejecute el ejercicio1
      soliTareas().then((data) => {
        console.log(data);
      })
      continue;
     } else if (elige == 2) {             //Si elije es igual a 2 entonces ejecute el ejercicio2
       consulUser().then((data) => {   
        console.log(data);
      })
      continue;
     } else if (elige == 3) {               //Si elije es igual a 3 entonces ejecute el ejercicio3
      obtenerPost().then((data) => {
        console.log(data);
      })
      continue;
     } else if (elige == 4) {                //Si elije es igual a 4 entonces ejecute el ejercicio4
      soliUsuario().then((data) => {
        console.log(data);
      })
      continue;
     } else if (elige == 5) {                //Si elije es igual a 5 entonces ejecute el ejercicio5
      manejarDatos().then((data) => {
        console.log(data);
      });
      continue;
    }
     else if (elige == 0) {              //Si elije es igual a 0 entonces acabe el ciclo
      break;
    }else alert("Numero no encontrado")  //Si no elige ningun de las opciones anteriores envie una alerta diciendo que esa opcion no se encunetra
   }




