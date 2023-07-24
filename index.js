const express = require('express');
const cors = require('cors');
const SerpApi = require('google-search-results-nodejs');

const app = express();
app.use(cors());
app.set('json spaces', 2)

app.get('/search', (req, res) => {
    const search = new SerpApi.GoogleSearch("eb0003d328469f1459a392a58424ffdf2be3feea1fec1f2f23517275740b3367");
    const busqueda = req.query.q + "-pelicula";

    console.log("se realizo la busqueda: " + busqueda)
    const params = {
        engine: "google_images",
        q: busqueda
    };

    search.json(params, (data) => {

        let busquedaSugerida;
        let imagenSrc;

        for (let i in data.suggested_searches) {
            if (data.suggested_searches[i].name == "poster" || data.suggested_searches[i].name == "movie" || data.suggested_searches[i].name == "wallpaper") { 
                busquedaSugerida = data.suggested_searches[i].name;
                imagenSrc = data.suggested_searches[i].thumbnail
            }

            if(busquedaSugerida == ""){
                busquedaSugerida = data.suggested_searches[0].name + " (busqueda por defecto)";
                imagenSrc = data.suggested_searches[0].thumbnail;
            }
        }

        console.log("devolvimos la busqueda sugerida: " + busquedaSugerida)
        console.log("imagen que devolvemos: " + imagenSrc)
        res.json(imagenSrc)
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});