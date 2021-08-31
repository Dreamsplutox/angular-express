module.exports = app => {
  const tutos = require("../controllers/tuto.controller.js");

  var router = require("express").Router();

  // Create a new tuto
  router.post("/", tutos.create);

  // Retrieve all tutos
  router.get("/", tutos.findAll);

  // Retrieve all published tutos
  router.get("/published", tutos.findAllPublished);

  // Retrieve a single tuto with id
  router.get("/:id", tutos.findOne);

  // Update a tuto with id
  router.put("/:id", tutos.update);

  // Delete a tuto with id
  router.delete("/:id", tutos.delete);

  // Delete all tutos
  router.delete("/", tutos.deleteAll);

  app.use('/api/tutos', router);
};