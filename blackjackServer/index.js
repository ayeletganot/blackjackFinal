let server = require("./models/server");
let authentication = require("./models/authentication");


const actions = {
    "/login": authentication.login,
    "/signUp": authentication.signUp,
};

server.startServer(actions);