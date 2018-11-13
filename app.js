let buscar = document.getElementById("buscarNombre")
if (buscar !== null) {
    buscar.addEventListener("click", guardarBusqueda)
}

let datosGuardados = JSON.parse(localStorage.getItem("peliculasSeleccionadas"));
if (datosGuardados !== null) {
    mostrarDatosSeleccionados(datosGuardados);
}

function obtenerPelicula(search) {
    let xhr = new XMLHttpRequest();
    let url = "https://api.themoviedb.org/3/search/movie?api_key=&query=" + search; //poner apikey
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let pelicula = JSON.parse(xhr.response).results;
            let arrayInfoPelicula = []
            for (let i = 0; i < pelicula.length; i++) {
                arrayInfoPelicula.push(pelicula[i]);
            }
            mostrarDatos(pelicula);
        }
    };
    xhr.send();
}

function guardarBusqueda() {

    let search = document.getElementById("search").value;
    obtenerPelicula(search);
}

function mostrarDatos(arrayInfoPelicula) {

    let peliculasSeleccionadas = [];
    let guardado = JSON.parse(localStorage.getItem("peliculasSeleccionadas"));
    if (guardado === null) {
        peliculasSeleccionadas = [];
    } else {
        peliculasSeleccionadas = guardado
    }
    document.getElementById("listaPeliculas").innerHTML = "";
    for (let i = 0; i < arrayInfoPelicula.length; i++) {
        let elementoDiv = document.createElement("div");
        //if (i % 3 == 0) {
        //    elementoDiv.setAttribute("class", "clearfix col-md-4 col-sm-6 col-xs-12");
        //}
        elementoDiv.setAttribute("class", "col-md-4 col-sm-6 col-xs-12");
        let imagen = document.createElement("img")
        //imagen.setAttribute("height", "425");
        imagen.setAttribute("class", "img-rounded img-responsive");
        imagen.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + arrayInfoPelicula[i].poster_path);
        let texto = document.createElement("h4");
        texto.setAttribute("class", "title");
        let pelicula = document.createTextNode(arrayInfoPelicula[i].title);
        texto.appendChild(pelicula);
        imagen.addEventListener("click", function () {
            //peliculasSeleccionadas.push("<div class=\"col-md-4 col-sm-6 col-xs-12\">"+"<img class=\"img-rounded img-responsive\" src=\"https://image.tmdb.org/t/p/w300/" + arrayInfoPelicula[i].poster_path + "\"/>", "<h4 class=\"title\">" + arrayInfoPelicula[i].title + "</h4>"+"</div>");
            peliculasSeleccionadas.push({ titulo: arrayInfoPelicula[i].title, poster: arrayInfoPelicula[i].poster_path });
            localStorage.setItem("peliculasSeleccionadas", JSON.stringify(peliculasSeleccionadas));
            mostrarDatosSeleccionados(peliculasSeleccionadas);
        });
        elementoDiv.appendChild(imagen);
        elementoDiv.appendChild(texto);
        document.getElementById("listaPeliculas").appendChild(elementoDiv);
        //document.getElementById("listaPeliculas").appendChild(imagen);
        //document.getElementById("listaPeliculas").appendChild(texto);
    }
}

function mostrarDatosSeleccionados(peliculasSeleccionadas) {
    document.getElementById("listaPeliculasSeleccionadas").innerHTML = "";
    for (let i = 0; i < peliculasSeleccionadas.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "col-md-4 col-sm-6 col-xs-12");

        let img = document.createElement("img");
        img.setAttribute("class", "img img-rounded img-responsive");
        img.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + peliculasSeleccionadas[i].poster);

        let titulo = document.createElement("h4");
        titulo.setAttribute("class", "title");

        let textoTitulo = document.createTextNode(peliculasSeleccionadas[i].titulo);

        titulo.appendChild(textoTitulo);

        div.appendChild(img);
        div.appendChild(titulo);

        document.getElementById("listaPeliculasSeleccionadas").appendChild(div);
    }
}

//Stack menu when collapsed
$('#bs-example-navbar-collapse-1').on('show.bs.collapse', function () {
    $('.nav-pills').addClass('nav-stacked');
});

//Unstack menu when not collapsed
$('#bs-example-navbar-collapse-1').on('hide.bs.collapse', function () {
    $('.nav-pills').removeClass('nav-stacked');
});