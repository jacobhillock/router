const utils = require("./routerUtils");

class Route {
  /**
   *
   * @param {string} path the path of the route
   * @param {string} method the method of retrieval
   * @param {string[]} paramNames the list of params to accept
   * @param {function} action what the route with show takes ins params and route
   * @param {boolean} strict route is strict or begins with
   */
  constructor(path, method, paramNames, action, strict) {
    this.path = path;
    this.method = method;
    this.paramNames = paramNames;
    this.action = action;
    this.strict = strict;
  }

  useRoute(path, method) {
    // check path and method are correct
    return (
      ((this.strict && this.path == path) ||
        (!this.strict && path.startsWith(this.path))) &&
      method == this.method
    );
  }

  scoreParams(params) {
    if (this.paramNames.length > 0 || params != null) {
      var total = 0;
      for (const par of this.paramNames) {
        if (utils.param_exist(params, par)) total = total + 1;
      }
      return total > 0 ? total : -1;
    }
    return 1;
  }
}

class RouterConfig {
  constructor(defaultRoute) {
    this.defaultRoute = defaultRoute;
    this.routes = [];
  }

  addRoute(newRoute) {
    if (newRoute instanceof Route) {
      this.routes.push(newRoute);
    }
  }

  route(url, method) {
    const [path, params] = utils.parse_url(url);
    var best = this.defaultRoute;
    var bestTotal = -1;
    var total;
    for (const r of this.routes) {
      total = r.scoreParams(params);
      if (r.useRoute(path, method) && total > bestTotal) {
        best = r;
        bestTotal = total;
      }
    }
    return best.action(params, path);
  }
}

module.exports = { RouterConfig, Route };
