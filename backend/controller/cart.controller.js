import product from "../models/product.model.js";

export const getAllproducts = async(req,res)=>{
    try {
        const products = await product.find({_id:{$in:req.user.cartItems}});
        // add quantity for each product
        const cartItems = products.map(product =>{
            const item = req.user.cartItems.find(cartItem =>cartItem.id === product.id);
            return {...product.toJSON(),quantity:item.quantity}
        })
        res.json(cartItems)
    } catch (error) {
        console.log("Error in getCartProduct controller",error.message);
        res.status(500).json({message:"server error",error:error.message})
    }
}
export const addToCart = async(req,res) =>{
    try {
        const {productId} = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity += 1;
        }else{
            user.cartItems.push(productId);
        }
        await user.save();
        res.json(user.cartItems)
    } catch (error) {
        console.log("Error in addToCart controller",error.message);
        res.status(500).json({message:"server error",error:error.message})
        
    }
}

export const removeAllFromCart = async(req,res)=>{
    try {
        const {productId} = req.body;
        const user = req.user;
        if (!productId) {
            user.cartItems = [];
        }else{
            user.cartItems = user.cartItems.filter((item)=>item.id !== productId);
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}
export const extendReservationPeriod = async (req, res) => {
    try {
        const { id: productId } = req.params; // Extract productId from request params
        const { endDate } = req.body; // Extract new reservation end date from request body
        const user = req.user; // Get authenticated user

        // Find the product in user's cart
        const existingItem = user.cartItems.find((item) => item.id === productId);

        if (!existingItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Ensure reservation field exists before updating
        if (!existingItem.reservation) {
            existingItem.reservation = {};
        }

        existingItem.reservation.endDate = new Date(endDate); // Update reservation end date
        await user.save(); // Save user data

        res.json({ message: "Reservation extended successfully", cartItems: user.cartItems });
    } catch (error) {
        console.log("Error in extendReservationPeriod controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updatequantity = async(req,res)=>{
    try {
        const {id:productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.id === productId);

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item)=> item.id !== productId);
                await user.save()
                return res.json(user.cartItems);
            }
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        }else{
            res.status(404).json({message:"Product not found"})
        }

    } catch (error) {
        console.log("Error in updatequantity controller",error.message);
        res.status(500).json({message:"server error",error:error.message})
        
    }
}