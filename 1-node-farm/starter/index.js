const fs = require('fs');
const http = require('http');
const url = require('url');


/////////////////////////////////////////////////////////------FILES-----//////////////////////////////////////////////////////////////////////////////////////////

// Blocking, synchronous method
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado : ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Created');

// Non-Blocking, synchronous method
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR! File Not Found!');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log("Your file have been written 😃");
//             })
//         });
//     });
// });
// console.log('Will Read File!');
/////////////////////////////////////////////////////////------FILES-----//////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////------SERVER-----//////////////////////////////////////////////////////////////////////////////////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    } else if (pathName === '/product') {
        res.end('This is the product');
    } else if (pathName === '/api') {
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>This page cannot be found</h1>');
    }

    // res.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('The servier is listening on port 8000');
});


/////////////////////////////////////////////////////////------SERVER-----//////////////////////////////////////////////////////////////////////////////////////////