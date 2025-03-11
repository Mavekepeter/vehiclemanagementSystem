import express from "express"
import {addToCart, getAllproducts, removeAllFromCart, updatequantity,extendReservationPeriod} from '../controller/cart.controller.js'
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/",protectRoute,getAllproducts)
router.post("/",protectRoute,addToCart)
router.delete("/",protectRoute,removeAllFromCart)
router.put("/:id",protectRoute,updatequantity)
router.put("/:id/extend-reservation", protectRoute, extendReservationPeriod); 

export default router