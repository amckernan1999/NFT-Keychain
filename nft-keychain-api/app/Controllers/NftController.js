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

    // async getUserNfts2(ctx) {
    //     return new Promise((resolve, reject) => {
    //         let query = "SELECT title, nftID, url FROM collections WHERE userID =?";
    //         console.log(ctx.params.userID);
    //         dbConnection.query(
    //             {
    //                 sql: query,
    //                 values: [ctx.params.userID]
    //             }, (error, tuples) => {
    //                 if (error) {
    //                     console.log("Query error.", error);
    //                     ctx.body = [];
    //                     ctx.status = 200;

    //                     return reject(`Query error. Error msg: error`);
    //                 }
    //                 console.log(tuples + ': Here');
    //                 ctx.body = tuples[55];
    //                 ctx.status = 200;
    //                 return resolve();
    //             }
    //         )
    //     }).catch(err => {console.log('authorize in NftController threw an exception. Reason...', err);});
    // }

    async putUserNft(ctx) {
        console.log('put user nft 2');

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

}

module.exports = NftController;