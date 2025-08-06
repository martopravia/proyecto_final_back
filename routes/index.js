/*
 * No hay una única forma de organizar las rutas de un sitio web.
 * Una alternativa podría ser organizar las rutas por recurso (o entidad):
 */

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const exampleRoutes = require("./exampleRoutes");
// const tokenRoutes = require("./tokenRoutesDash");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  /*
   * Al construir una API REST, la convención es que las rutas relativas a
   * un recurso (o entidad) tengan como prefijo el nombre de dicho recurso
   * en inglés y en plural.
   *
   * Ejemplo:
   * Las rutas relativas a los usuarios se agrupan bajo la URL `/users`
   * (en inglés y en plural). Del mismo modo, las rutas relativas a los artículos
   * se deberían agrupar bajo la URL `/articles` (en inglés y en plural).
   */
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/tokens", authRoutes);
  app.use("/orders", orderRoutes);

  app.use("/examples", exampleRoutes);
};
