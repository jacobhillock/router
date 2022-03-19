const routerConfig = require("./routerConfig");

function makeConfig() {
  var config = new routerConfig.RouterConfig(
    new routerConfig.Route(
      "/",
      "GET",
      [],
      (params, route) => {
        return `
        <center>
        <h1> This is the default page</h1>
        <p>The only acceptable paths are:<pre>/hi[?name=___]</pre><pre>/hi/*</pre></p>
        </center>
        `;
      },
      true
    )
  );
  config.addRoute(
    new routerConfig.Route(
      "/hi",
      "GET",
      ["name"],
      (params, route) => {
        return `<h2>Hello ${params.name}</h2>`;
      },
      true
    )
  );
  config.addRoute(
    new routerConfig.Route(
      "/art",
      "GET",
      [],
      (params, route) => {
        return `<pre>
            o
           /|\\
           /\\
        </pre>`;
      },
      true
    )
  );
  config.addRoute(
    new routerConfig.Route(
      "/programs",
      "GET",
      [],
      (params, route) => {
        return `<pre>
        print('hello world')
        </pre>`;
      },
      true
    )
  );
  config.addRoute(
    new routerConfig.Route(
      "/hi",
      "GET",
      [],
      (params, route) => {
        const routeSplit = route.split("/");
        routeSplit.splice(0, 2);
        const subRoute = decodeURI(`/${routeSplit.join("/")}`);
        return `
        <center>
        <h1>You have made it to the twilight zone</h1>
        <h4>${
          routeSplit.length > 0 ? "with a sub route of " + subRoute : ""
        }</h4>
        </center>
        `;
      },
      false
    )
  );

  return config;
}

module.exports = { makeConfig };
