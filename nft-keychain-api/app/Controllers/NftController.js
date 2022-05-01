const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class NftController {

    async getUserNfts(ctx) {
        console.log('getUserID');
        return new Promise((resolve, reject) => {

            let query = "SELECT id, title, url FROM collections WHERE userID =?;";
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

    async getUserNfts2(ctx) {
        return new Promise((resolve, reject) => {
            let query = "SELECT title, nftID, url FROM collections WHERE userID =?";
            console.log(ctx.params.userID);
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.userID]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        ctx.body = [];
                        ctx.status = 200;

                        return reject(`Query error. Error msg: error`);
                    }
                    console.log(tuples + ': Here');
                    ctx.body = tuples[55];
                    ctx.status = 200;
                    return resolve();
                }
            )
        }).catch(err => {console.log('authorize in NftController threw an exception. Reason...', err);});
    }

}

module.exports = NftController;