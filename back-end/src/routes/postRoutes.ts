import express from "express"
import { verifyAccessToken } from "../middlewares/verifyToken"
import {postControllers} from "../controllers/postControllers"
import { updatePost } from '../controllers/postControllers';
import { upload } from '../middlewares/uploadMiddleware'; 

const router = express.Router()


router.get("/all", verifyAccessToken, postControllers.getAllPostsByUserId)
router.get("/:id", verifyAccessToken, postControllers.getPostById)


router.put("/edit/:id", verifyAccessToken, upload.single('file'), updatePost);



router.post("/refine", postControllers.refinePost)



router.post("/create", verifyAccessToken, postControllers.createPost)


router.post("/publish/instagram", verifyAccessToken, postControllers.publishToInstagram);
router.post("/publish/facebook", verifyAccessToken, postControllers.publishToFacebook);

router.put("/publish/:id", verifyAccessToken, postControllers.publishPost);


router.delete("/:id", verifyAccessToken, postControllers.deletePostById )

export default router