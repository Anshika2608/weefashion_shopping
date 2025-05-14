import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const SuccessPayment = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const url = "https://weefashion-backend.onrender.com";

  // Extract orderId from query params
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  useEffect(() => {
    const clearCart = async () => {
      try {
        await axios.delete(`${url}/api/cart/clear`, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Cart cleared after successful payment!");
      } catch (err) {
        console.error("Failed to clear cart:", err);
        toast.error("Payment success, but failed to clear cart.");
      }
    };

    if (token) clearCart();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order <strong>ID: {orderId}</strong> has been confirmed.
        </p>
        <a
          href="/"
          className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default SuccessPayment;
