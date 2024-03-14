import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

import { validateJobInput } from "../middleware/validiationMiddleware.js";
import { validateIdParam } from "../middleware/validiationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

//one way to route is to write them all out
// router.get('/', getAllJobs)
// router.post("/", createJob);

//another way is to chain togther crud methods using the same route
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
