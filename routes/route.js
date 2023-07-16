const express = require("express");
const {
  getContacts,
  createContacts,
  updateContacts,
  getContactsById,
  deleteContacts,
} = require("../controllers/controller");
const router = express.Router();

router.route("/").get(getContacts).post(createContacts);

router
  .route("/:id")
  .get(getContactsById)
  .put(updateContacts)
  .delete(deleteContacts);

//below is a view of routes before shortening them

// router.route("/").get(getContacts);

// router.route("/:id").get(getContactsById);

// router.route("/").post(createContacts);

// router.route("/:id").put(updateContacts);

// router.route("/:id").delete(deleteContacts);
module.exports = router;
