const {JSDOM} = require("jsdom");

function normalizeURL(urlString){
    const urlObject = new URL(urlString);
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === "/"){
        return hostPath.slice(0,-1);
    }
    return hostPath;
}

function getURLsFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    const urls = [];
    linkElements.forEach(link =>{
        if(link.href.slice(0,1) === "/"){
            // Relative
            try{
                const urlObject = new URL(`${baseURL}${link.href}`);
                urls.push(urlObject.href);
            }catch(err){
                console.log(`Problem with relative url`);
                console.log(`error: ${err}`);
            }
        }else{
            // Absolute
            try{
                const urlObject = new URL(link.href);
                urls.push(urlObject.href);
            }catch(err){
                console.log(`Problem with absolute url`);
                console.log(`error: ${err}`);
            }
        }
    })
    return urls
}

async function crawlPage(currentURL){
    console.log(`actively crawling: ${currentURL}`);
    try{
        const response = await fetch(currentURL);
        if (response.status > 399){
            console.log(`Error in fetch with status code: ${response.status} on page: ${currentURL}`);
            return;
        }
        const contentType = response.headers.get("content-type");
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`);
            return;
        }
        console.log(await response.text());
    }catch(err){
        console.log(`Error in fetch : ${err} on page: ${currentURL}`);
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}