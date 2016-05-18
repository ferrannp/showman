var expressServer = require("./express-server");

const PORT = process.env.PORT || 3000;
const PROD = process.env.NODE_ENV === "production";

if (PROD) {
  expressServer(PORT);
} else {
  expressServer(PORT - 1);
  var appServer = require("./webpack-server");
  appServer(PORT);
}