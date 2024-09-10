const express = require('express');
const cors = require('cors');
const SerpApi = require('google-search-results-nodejs');

const app = express();
app.use(cors());
app.set('json spaces', 2)

app.get('/search', (req, res) => {
    const search = new SerpApi.GoogleSearch("eb0003d328469f1459a392a58424ffdf2be3feea1fec1f2f23517275740b3367");
    const busqueda = req.query.movie_name + " Poster Pelicula";

    console.log("Se realizo la busqueda: " + busqueda)
    const params = {
        engine: "google_images",
        q: busqueda
    };

    search.json(params, (data) => {
        console.log("Respuesta de la api", data)
        res.json(searchTheBestPoster(data))
        //res.json(data)
    });
});





function searchTheBestPoster(data){
    return data.images_results.find(elemento => elemento.title.includes('Poster'))
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});