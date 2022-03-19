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
  var path,
    params = null;
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
 * @param {object} params
 * @param {string} name the name of the param to check for
 * @returns
 */
function param_exist(params, name) {
  if (typeof params === "undefined" || params === null) {
    return false;
  } else if (typeof params[name] === "undefined" || params[name] === null) {
    return false;
  } else {
    return true;
  }
}

module.exports = { param_exist, parse_params, parse_url };
