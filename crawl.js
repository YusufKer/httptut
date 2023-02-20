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

module.exports = {
    normalizeURL,
    getURLsFromHTML
}