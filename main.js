const {crawlPage} = require("./crawl.js")

async function main(){
    if(process.argv.length < 3){
        console.log("no arguments provided");
        process.exit(1);
    }else if(process.argv.length >3){
        console.log("too many arguments provided");
        process.exit(1);
    }
    try{
        const baseURL = new URL(process.argv[2]);
        console.log(`Starting crawl of (${baseURL})`)
        await crawlPage(baseURL);
    }catch(err){
        console.log(`Error: ${err}`)
    }
}

main();