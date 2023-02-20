const {normalizeURL, getURLsFromHTML} =  require("./crawl.js");
const {test, expect} = require("@jest/globals");

test("normalizeURL strip protocol", () =>{
    const input = "https://blog.boot.dev/path";
    const actualOutput = normalizeURL(input);
    const expectedOutput = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expectedOutput);
})

test("normalizeURL remove trailing slash", () =>{
    const input = "https://blog.boot.dev/path/";
    const actualOutput = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expected);
})

test("normalizeURL convert captitals to lowercase", () =>{
    const input = "https://Blog.boot.Dev/path/";
    const actualOutput = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actualOutput).toEqual(expected);
})

test("getURLsFromHTML pull out absolute URLS", () =>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev">Boot.dev Blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actualOutput).toEqual(expected);
})

test("getURLsFromHTML pull relative URLS", () =>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path">Boot.dev Blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path"];
    expect(actualOutput).toEqual(expected);
})
test("getURLsFromHTML pull multiple URLS", () =>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path">Boot.dev Blog</a>
                <a href="https://blog.boot.dev/path2">Boot.dev Blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path","https://blog.boot.dev/path2"];
    expect(actualOutput).toEqual(expected);
})
test("getURLsFromHTML throw invalid urls", () =>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">Boot.dev Blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = [];
    expect(actualOutput).toEqual(expected);
})