const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //Solution 1 - it loads the full file into memory and then sends the data. example file is 10,000 lines, so can run our resources very quick.
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    //Solution 2:  Streams
    //We have access to the data event when we create a readStream.
    //we then get access to the end event when the event has finished reading the stream
    // This solution has the problem of 'back-pressure' where we can't send the data as quickly as we are receiving it'
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', error => {
    //     console.log(error);
    //     res.statusCode = 500;
    //     res.end('File Not Found');
    // });

    //Solution 3
    //We will use the pipe command to pipe the output of a readable stream into a writeable stream.
    // this should fix the problem of back-pressure as it will then handle hte speed of data coming in and data coming out.
    //readableSource.pipe(writeableDest);
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);

});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening on port 8000");
});