const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;

//express
const app = express();
app.use (express.json());
//Cookie-session
app.use(
    cookieSession({
        name: "nomeAleatorio",
        keys: ["chavealeatoria"],
        maxAge: 60 * 1000, // 1 minuto
    })
);
//passaport
//BANCO TEMPORARIO
const users = [
    {id: 1,
        user: "Usuario 1",
        email: "user@email.com",
        pwd: "123"
    },
    {id: 2,
        user: "Usuario 2",
        email: "user2@email.com",
        pwd: "456"
    }
]
//BANCO TEMPORARIO

passport.use(
    new LocalStrategy({
        usernameField: "user",
        passwordField: "pwd"
    },
    (username, password, done) => {
        let user = users.find((user) => {
            return user.email === username && user.pwd === password;
        })

        if(user)
            done(null,user);
        else
            done(null,false,{message: "Usuario e/ou senha incorretos"})
    })
);

app.use(passport.initialize());
app.use(passport.session());
//Configuração dos middlewares
app.use(cors({credentials: true, origin: "http://localhost:3000/"}));

app.post("/api/login", (request,response,next)=>{
    passport.authenticate("local", (err,user,info)=>{
        if(err) return next(err);
        if(!user)
            return response.status(400).send([user, "Não foi possivel efetuar o Log in", info]);
        request.login(user, (err)=>{
            response.send("Logado!");
        });
    })(request, response, next);
});

//não funcionou
app.listen("3030",(request,response)=>{
    console.log("Servidor ouvindo na porta 3030");
});

//Configuração das rotas da API
//app.get("/", (req, res) =>{
//    res.send("Express server");
//    res.end();
//});

//Exporta o aplicativo express configurado
//module.exports = app;