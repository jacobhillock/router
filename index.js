const http = require("http");
const makeConfig = require("./myconfig");
const config = makeConfig.makeConfig();

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(config.route(req.url, req.method));
  } catch (error) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/html");
    res.end(`
<h1>ERROR HAS OCCURED</h1>
<pre>
${error}
</pre>
    `);
    console.error(error);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
