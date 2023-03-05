const db = require("./db");

(async () => {
    try{
        const result = await db.query("SELECT * FROM demo");
        console.log(result);
    }catch(err){
        console.log(err);
    }
})()
