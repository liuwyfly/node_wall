const puppeteer = require('puppeteer');
const sleep = time => new Promise(resolve => {
     setTimeout(resolve, time);
 });

(async () => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com');
    await page.setViewport({width:1920, height:1080});
    console.log(new Date().toLocaleString());
    await sleep(3000);
    console.log(new Date().toLocaleString());
    const documentSize = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height : document.body.scrollHeight,
        }
    })

    console.log(documentSize);
    
    await page.screenshot({path:"/usr/local/nginx/html/y01.png", clip : {x:0, y:0, width:1920, height:1900}});
    const content = await page.content();
    console.log(content);
    await browser.close();
})();
