const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class NftController {

    async getUserNfts(ctx) {

        return new Promise((resolve, reject) => {

            let query = "SELECT id, title, url, path FROM collections WHERE userID =?;";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.userID]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    ctx.body = tuples;
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('create in NftController threw an exception. Reason...', err);
            ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }

    async putUserNfts(ctx) {

        return new Promise((resolve, reject) => {

            let query = "INSERT INTO collections (url, title, path, userID)  VALUES (?,?,?,?);";
            dbConnection.query(
                {
                    sql: query,
                    values: [ ctx.params.url, ctx.params.title, ctx.params.path, ctx.params.userID]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    ctx.body = "it is time for adding NFTs";
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('create in NftController threw an exception. Reason...', err);
            ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }



}

module.exports = NftController;