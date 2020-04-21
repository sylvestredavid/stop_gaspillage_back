import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const ProduitSchemas = new Schema({
    nom: String,
    image: String,
    isbn: String,
    quantiteEnGramme: Number,
    dluo: Date,
    imageFromNet: Boolean,
    user: String,
    tokenDevice: String
})