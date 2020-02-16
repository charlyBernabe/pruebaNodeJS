let mongoose = require('mongoose');
let db;
exports.DBConnectMongoose = function(mongoUrl) {
    console.log('mongodb', mongoUrl)
    return new Promise(function(resolve, reject) {
        mongoose.Promise = global.Promise;
        if (db) {
            return resolve(db);
        }

        mongoose.connect(mongoUrl, { useNewUrlParser: true })
            .then(() => {
                db = mongoose.connection;
                resolve(db);
            })
            .catch(err => {
                reject(err);
            });
    })
}