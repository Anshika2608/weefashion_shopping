import React from "react"
import {Route,Routes} from 'react-router-dom'
import Men from './Pages/Men'
import Women from './Pages/Women'
import Kids from './Pages/Kids'
import Wishlist from "./Pages/Wishlist/Wishlist"
import Layout from "./Components/Layout/Layout"
import Home from "./Pages/Home/Home"
import MenBottomwear from "./Pages/men/MenBottomwear"
import MenTopwear from "./Pages/men/MenTopwear"
import MenFootwear from "./Pages/men/MenFootwear"
import WomenTopwear from "./Pages/Women/WomenTopwear"
import WomenFootwear from "./Pages/Women/WomenFootwear"
import WomenBottomwear from "./Pages/Women/WomenBottomwear"
import SingleProduct from "./Pages/SingleProduct/SingleProduct"
import LogIn from "./Pages/LogIn/LogIn"
import SignUp from "./Pages/SignUp/SignUp"
import KidsFootwear from "./Pages/Kids/KidsFootwear"
import KidsTopwear from "./Pages/Kids/KidsTopwear"
import KidsBottomwear from "./Pages/Kids/KidsBottomwear"
import AddToCart from "./Pages/Addtocart/AddToCart"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import NewPassword from "./Pages/NewPassword/NewPassword"
import NewProduct from "./Pages/NewProduct/NewProduct"
import PlaceOrder from "./Pages/Place_Order/PlaceOrder"
function App() {
  return (
    <>
  
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/newProduct' element={<NewProduct/>} />
      <Route path="/MenBottomwear" element={<MenBottomwear/>}/>
      <Route path="/MenTopwear" element={<MenTopwear/>}/>
      <Route path="/MenFootwear" element={<MenFootwear/>}/>
      <Route path="/WomenBottomwear" element={<WomenBottomwear/>}/>
      <Route path="/WomenTopwear" element={<WomenTopwear/>}/>
      <Route path="/WomenFootwear" element={<WomenFootwear/>}/>
      <Route path="/KidsBottomwear" element={<KidsBottomwear/>}/>
      <Route path="/KidsFootwear" element={<KidsFootwear/>}/>
      <Route path="/KidsTopwear" element={<KidsTopwear/>}/>
      <Route path="/Singleproduct/:id" element={<SingleProduct/>}/>
      <Route path='/Men' element={<Men/>}/>
      <Route path="/NewPassword/:id/:token" element={<NewPassword/>}/>
      <Route path='/Women' element={<Women/>}/>
      <Route path='/Kids' element={<Kids/>}/>
      <Route path='/cart' element={<AddToCart/>}/>
      <Route path='/wishlist' element={<Wishlist/>} />
      <Route path="/LogIn" element={<LogIn/>} />
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/Forgot" element={<ForgotPassword/>}/>
      <Route path="/place-order" element={<PlaceOrder/>}/>
      </Route>
     </Routes>
     
   
    </>
  )
}

export default App
