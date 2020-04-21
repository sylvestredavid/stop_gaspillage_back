var FCM = require('fcm-node');
var serverKey="AAAA2ERuUZs:APA91bFcI4QajnilUn7znqqKEnCYSXDwX-v338OWPJRwySDSvo2IvTysoX-jdWlHAX9QqlwS1hlJ0SSI33yzPvvswjNLo8Hn1Eom7ZkPa-CyzjHTK8iku4cBEyVwT94lovcABIb6HMtT";
var fcm = new FCM(serverKey);

export const sendNotif = (token, produit) => {
    var textMessage=`${produit.nom}`;
    var title="Date limite proche";
    var message = {
        to: token,
        notification: {
            title: title, //title of notification
            body: textMessage, //content of the notification
            sound: "default",
            icon: "ic_launcher" //default notification icon
        },
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Notification not sent");
            console.log(err + ' ' + produit.tokenDevice)
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}