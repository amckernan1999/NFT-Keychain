const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

class LoginController {
    async authorizeUser(ctx) {
        console.log('authorizeUser');
        return new Promise((resolve, reject) => {

	    // Right up here, you could inspect the provided uers_id to
	    // make sure that it is, at the surface, a legitimate ID.
	    // For example, if user ids are suppose to be email addresses,
	    // you can at least make sure that user's input is consistent
	    // with the format of email addresses. 
	    
            let query = "SELECT * FROM users WHERE userName = ? and userPassword = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.userName, ctx.params.userPassword]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    if (tuples.length === 1) {  // Did we have a matching user record?
                        setAccessToken(ctx, tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                    } else {
                        console.log('Not able to identify the user.');
			            return reject('username or password incorrect');
                    }
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('authorize in LoginController threw an exception. Reason...', err);
	    ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }

    async checkForUser(ctx) {
        console.log('checkForUser');
        return new Promise((resolve, reject) => {
	    
            let query = "SELECT * FROM users WHERE userName = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.userName]
                }, (error, tuples) => {
                    console.log('t', tuples);
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    if (tuples.length === 0) {
                        ctx.body = {
                            status: "Success"
                        };
                    } else {
                        console.log('already a user with that username');
			            return reject('already a user with that username');
                    }
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('check in LoginController threw an exception. Reason...', err);
	    ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }

    async createUser(ctx) {
        console.log('createUser');
        return new Promise((resolve, reject) => {
	    
            let query = "INSERT INTO users (userName, userPassword) VALUES (?, ?)";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.userName, ctx.params.userPassword]
                }, (error) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
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

}

module.exports = LoginController;
