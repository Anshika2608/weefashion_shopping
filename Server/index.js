const express = require("express");
require("./config/config");
const cors = require("cors");
const cookieParser=require("cookie-parser")
const app = express();
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(cookieParser())
const port=process.env.PORT || 3000;

app.use("/api/home", require("./routes/Homeroutes"));
app.use("/api/home",require("./routes/Homeroutes"))
 app.use("/api/menTopWear",require("./routes/Clothingroutes"))
app.use("/api/menBottomWear",require("./routes/Clothingroutes"))
app.use("/api/womenTopwear",require("./routes/Clothingroutes"))
app.use("/api/womenBottomwear",require("./routes/Clothingroutes"))
app.use("/api/menFootwear",require("./routes/Clothingroutes"))
app.use("/api/WomenFootwear",require("./routes/Clothingroutes"))
app.use("/api/kidsTopwear",require("./routes/Clothingroutes"))
app.use("/api/kidsBottomwear",require("./routes/Clothingroutes"))
app.use("/api/kidsFootwear",require("./routes/Clothingroutes"))
app.use("/api/wishlist",require("./routes/WishlistRoutes"))
app.use("/api/liked",require("./routes/WishlistRoutes"))
app.use("/api/deletewishlist",require("./routes/WishlistRoutes"))
app.use("/api/menTopWear",require("./routes/Clothingroutes"))
app.use("/api/menProducts",require("./routes/Clothingroutes"))
app.use("/api/womenProducts",require("./routes/Clothingroutes"))
app.use("/api/signup", require("./routes/Authenticationroutes"));
app.use("/api/login", require("./routes/Authenticationroutes"));
app.use("/api/validUser",require("./routes/Authenticationroutes"))
app.use("/api/logoutUser",require("./routes/Authenticationroutes"))
app.use("/api/changePassword",require("./routes/Authenticationroutes"))
app.use("/api/change",require("./routes/Authenticationroutes"))
app.use("/api/verifyForgot",require("./routes/Authenticationroutes"))
app.use("/api/cart",require("./routes/CartRoutes"))
app.use("/api/addCart",require("./routes/CartRoutes"))
app.use("/api/deletecart",require("./routes/CartRoutes"))
app.use("/api/newProduct",require("./routes/Clothingroutes"))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
