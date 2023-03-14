const app = require("./app.js");
    require("dotenv").config();

    //8080
    const port = process.env.SERVER_PORT || 3333;

    app.listen(port, () =>{
        console.log(`Server listening on port ${port}`);
    });