const {normalizeURL} =  require("./crawl.js");
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