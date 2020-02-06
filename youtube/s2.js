var processArgs = require('process.args')('add');
const puppeteer = require('puppeteer');
var fs = require('fs');
const sleep = time => new Promise(resolve => {
     setTimeout(resolve, time);
 });

console.log(processArgs);

(async () => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    // url = 'https://stackoverflow.com/questions/30922081/python-class-property-and-class-constants'
    await page.goto(processArgs.url);

    await page
    .mainFrame()
    .addScriptTag({
       url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js'
    })
    await page.waitFor(2000);

    await page.setViewport({width:1366, height:1080});
    console.log(new Date().toLocaleString());
    await sleep(3000);
    console.log(new Date().toLocaleString());
    const documentSize = await page.evaluate(() => {
        $('.js-notice-close').trigger('click');
        $('#js-gdpr-consent-banner').remove();
        return {
            width: document.documentElement.clientWidth,
            height : document.body.scrollHeight,
            targetHtml: $('.js-notice-close').prop("outerHTML")
        }
    })

    console.log(documentSize);
    console.log(documentSize.targetHtml);
    await page.waitFor(2000);
    await page.screenshot({path:"/usr/local/nginx/html/y01.png", clip : {x:0, y:0, width:1366, height:documentSize.height}});
    const content = await page.content();
    // console.log(content);
    fs.writeFile('/usr/local/nginx/html/y01.txt', content, function(err){
        if(err) console.log('write fail');
        else console.log('write success');
    });
    await browser.close();
})();
