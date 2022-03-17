/**
 *
 * @param {string} param_string the parameters after the '?'
 * @returns {object} the params as an object
 */
function parse_params(param_string) {
  // split parameters
  const param_list = param_string.includes("&")
    ? param_string.split("&")
    : [param_string];

  // reformat params to be JSON like
  const param_json = param_list.map((item) => {
    const [name, value] = item.includes("=")
      ? item.split("=")
      : [item, "undefined"];
    return `"${name}":"${value}"`;
  });

  // build and parse JSON
  return JSON.parse(`{${decodeURI(param_json.join(","))}}`);
}

/**
 *
 * @param {string} url the path after the first '/'
 * @returns {[string, object]} the path and the parameters passed in
 */
function parse_url(url) {
  var path, params;
  if (url.includes("?")) {
    path = url.split("?")[0];
    params = parse_params(url.split("?")[1]);
  } else {
    path = url;
  }
  return [path, params];
}

/**
 *
 * @param {string} path
 * @param {string} method GET,PUT,POST,etc
 * @param {*} params
 * @returns
 */
function route(path, method, params) {
  var statusCode, setHeader, end;
  if (path == "/") {
    statusCode = 200;
    setHeader = ("Content-Type", "text/plain");
    end = "Hello World";
  } else if (path == "/hi" && params.hi) {
    statusCode = 200;
    setHeader = ("Content-Type", "text/html");
    end = `<b>Hello from the other side</b> <h2>${params.hi}</h2>`;
  } else if (path == "/hi") {
    statusCode = 200;
    setHeader = ("Content-Type", "text/html");
    end = "<b>Hello from the other side</b>";
  } else if (path == "/favicon.ico") {
  } else {
    statusCode = 200;
    setHeader = ("Content-Type", "text/plain");
    end = "Hello World";
  }

  return [statusCode, setHeader, end];
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function router(req, res) {
  try {
    const [path, params] = parse_url(req.url);
    const method = req.method;
    console.log(params);

    const [statusCode, setHeader, end] = route(path, method, params);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(end);
  } catch (error) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>ERROR HAS OCCURED</h1>");
  }

  return res;
}

module.exports = { router };
