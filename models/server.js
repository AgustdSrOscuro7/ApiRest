const express = require('express')
const cors = require('cors')

const { bdmongo } = require('../database/MongoConnection')


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Conecta con BD inmediatamente que llamen a la clase
        this.dbConnection();
        this.app.use(express.json());

        //Enrutamiento
        this.pathMongo = {
            auth: '/api/auth',
            users: '/api/users',
            celebrities: '/api/celebrities',
            tagCelebrities: '/api/tagCelebrities',
            cities: '/api/cities',
            characters: '/api/characters',
            places: '/api/places',
            visitPlaces: '/api/visitPlaces',
            dishes: '/api/dishes',
            menuPlaces: '/api/menuPlaces',
            countries: '/api/countries',
        }
        
        //Middlewares
        this.middlewares();
        this.routes();
    }

    async dbConnection(){

        await bdmongo();
    }

    routes(){
        // Rutas para MongoDB
        this.app.use(this.pathMongo.auth, require('../routes/MongoAuth'));
        this.app.use(this.pathMongo.users, require('../routes/MongoUsers'));
        this.app.use(this.pathMongo.celebrities, require('../routes/MongoCelebrities'));    
        this.app.use(this.pathMongo.tagCelebrities, require('../routes/MongoTagCelebrities'));
        this.app.use(this.pathMongo.cities, require('../routes/MongoCities'));
        // this.app.use(this.pathMongo.characters, require('../routes/MongoCharacters'));
        this.app.use(this.pathMongo.places, require('../routes/MongoPlaces'));
        this.app.use(this.pathMongo.visitPlaces, require('../routes/MongoVisitPlaces'));
        this.app.use(this.pathMongo.dishes, require('../routes/MongoDishes'));
        this.app.use(this.pathMongo.menuPlaces, require('../routes/MongoMenuPlaces'));
        this.app.use(this.pathMongo.countries, require('../routes/MongoCountries'));
    }

    middlewares(){
        // Evita errores por Cors Domain Access
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON
        this.app.use(express.json());
        
        // Manejo del directorio público
        this.app.use(express.static('public'));
    }

    //Metodo que permite escuchar en qué puerto se establecerá el servicio
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;