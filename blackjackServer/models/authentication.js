function generateToken(n) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for(let i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

let users = {};

exports.signUp = (req,res,q)=> {

    if(req.method != "POST"){
        res.writeHeader(400, {'Content-Type':'text/plain'});
        res.end("expected POST request");
        return;
    }

    let body ="",userName,passWord;
    req.on("data",(chunck)=>{
        body += chunck;
    });
    req.on("end",() => {
        try{
            body = JSON.parse(body);
        }catch(err){
            res.writeHead(400, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
            res.end("invalid request");return;
        }
        
        userName = body.userName;
        passWord = body.passWord;

        if(users[userName]){
            res.writeHead(400, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
            res.end("user already exist");return;
        }
    
        
        users[userName] = {
            passWord,
        };
        res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
        res.end("ok");
    });
 
    
};

exports.login = (req,res,q) => {
    if(req.method != "POST"){
        res.writeHeader(400, {'Content-Type':'text/plain'});
        res.end("expected POST request");
        return;
    }

    let body ="";
    req.on("data",(chunck)=>{
        body += chunck;
    });
    req.on("end",() => {

        try{
            body = JSON.parse(body);
        }catch(err){
            res.writeHead(400, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
            res.end("invalid request");return;
        }
        
        userName = body.userName;
        passWord = body.passWord;

        if(!users[userName] ||  users[userName].password != passWord){
            res.writeHead(400, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
            res.end("userName or password wrong");return;
        }
        let token = generateToken(30);
        res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'});
        res.end(token);return;
        
    });
};