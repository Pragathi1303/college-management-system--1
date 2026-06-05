const express = require("express");
const router = express.Router();
const { getAllApplications, getApplication, createApplication, updateApplicationStatus, deleteApplication } = require("../Controllers/applicationController");

router.get("/", getAllApplications);
router.get("/:id", getApplication);
router.post("/", createApplication);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

module.exports = router;
