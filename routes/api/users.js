const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
    .get(usersController.findAll)
    .post(usersController.create)
    .put(usersController.update)
    .delete(usersController.remove);

// Matches with "/api/users/:id"
router
    .route("/:id")
    .get(usersController.findByInfo)
    .put(usersController.update)
    .delete(usersController.remove);

module.exports = router;