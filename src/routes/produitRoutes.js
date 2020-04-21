import {
    addProduit,
    deleteProduit,
    getProduitsUser,
    notificationDLCProche,
    updateProduit
} from "../controller/produitController";
import {sendNotif} from "../controller/notifications";

/**
 * routes de l'api pour travailler sur les produits
 * @param app : le server qui va utiliser les routes
 */
export const produitRoutes = (app) => {
    app.route('/produits')
        .post(addProduit)

    app.route('/produit/:produitId')
        .put(updateProduit)
        .delete(deleteProduit)

    app.route('/produitByUser/:userId')
        .get(getProduitsUser)

    app.route('/sendNotif')
        .get(notificationDLCProche)
}