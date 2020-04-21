import mongoose from 'mongoose'
import {ProduitSchemas} from '../models/produit.model'
import {sendNotif} from "./notifications";

const Produit = mongoose.model('Produit', ProduitSchemas)

/**
 * ajouter un produit
 * @param req : l'objet Requete
 * @param res : l'objet Response
 */
export const addProduit = (req, res) => {
    let newProduit = new Produit(req.body)

    newProduit.save((err, produit) => {
        if (err) {
            res.send(err)
        }
        res.json(produit)
    })
}

/**
 * recuperer tout les produits d'un user
 * @param req : l'objet Requete
 * @param res : l'objet Response
 */
export const getProduitsUser = (req, res) => {
    Produit.find({'user': req.params.userId}, (err, produits) => {
        if (err) {
            res.send(err)
        }
        res.json(produits)
    })
}

/**
 * modifier un produit
 * @param req : l'objet Requete
 * @param res : l'objet Response
 */
export const updateProduit = (req, res) => {
    Produit.findOneAndUpdate({_id: req.params.produitId}, req.body, {new: true}, (err, produit) => {
        if (err) {
            res.send(err)
        }
        res.json(produit)
    })
}

/**
 * supprimer un produit
 * @param req : l'objet Requete
 * @param res : l'objet Response
 */
export const deleteProduit = (req, res) => {
    console.log(req.params.produitId)
    Produit.remove({_id: req.params.produitId}, (err, {}) => {
        if (err) {
            res.send(err)
        }
        res.json({message: "Effacer commerce avec succès"})
    })
}

export const notificationDLCProche = () => {
    Produit.find({}, (err, produits) => {
        if (err) {
            console.log(err)
        }
        produits.forEach(
            (p) => {
                const now = Date.now()
                const diff = ((p.dluo.getTime() / 86400000) -(now / 86400000)).toFixed(0)
                console.log(diff)
                if (diff <= 3) {
                    sendNotif(p.tokenDevice, p)
                }
            }
        )
    })
}