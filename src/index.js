import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from "cors";
import {produitRoutes} from "./routes/produitRoutes";
import {schedule} from "node-cron";
import {notificationDLCProche} from "./controller/produitController";

const app = express();
const PORT = 8080;

//connexion mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://dav24130:Myriam24@cluster0-eoeiu.mongodb.net/stopgaspillagedb?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

//body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//cross origins
app.use(cors({
    origin: '*'
}));

produitRoutes(app)

schedule('0 35 8,18 * * *', () => {
    notificationDLCProche()
});

app.use(express.static('../public'))

app.get('/', (req, res) => {
    res.send("server node et express sur : " +PORT)
})

app.listen(PORT, () => console.log(`Server listen port ${PORT}`))