const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class NftController {

    async getUserNfts(ctx) {
        console.log('getUserNFTs b');
        return new Promise((resolve, reject) => {

            let query = "SELECT id, title, path, url FROM collections WHERE userID =?;";
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
            console.log('create in LoginController threw an exception. Reason...', err);
            ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }


    async putUserNft(ctx) {
        console.log('put user nft');

        return new Promise((resolve, reject) => {

            let query = "INSERT INTO collections (url, title, path, userID, keyhash)  VALUES (?,?,?,?,?);";
            dbConnection.query(
                {
                    sql: query,
                    values: [ ctx.params.url, ctx.params.title, ctx.params.path, ctx.params.userID, ctx.params.keyhash]
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

    async removeUserNft(ctx){
        return new Promise((resolve, reject) => {
            let query = "DELETE FROM collections WHERE id=?;";
            dbConnection.query(
                {
                    sql: query,
                    values: [ ctx.params.id]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    ctx.body = "nftRemoved";
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