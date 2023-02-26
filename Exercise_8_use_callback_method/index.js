const fs = require("fs");

fs.writeFile("textFile.txt", "Hello you! :-)", {encoding: "utf-8"}, (error) => {
    if(error){
        console.log(error);
    } else{
    console.log(`The file has been successfully created`);
    }
});