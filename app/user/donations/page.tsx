"use client";
import { useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
 
  const handleDonate = async () => {
   try{
    const res = await fetch("/api/donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });

    const data = await res.json();
    const donationId = data.donationId;

console.log("payhere:", window.payhere);
      if (!window.payhere) {
  alert("PayHere not loaded");
  return;
}

    
      
      window.payhere.startPayment({
        sandbox: true,
        merchant_id: "1233660",
        order_id: donationId, 
        items: "Donation",
        amount: Number(amount),
        currency: "LKR",

        notify_url: "http://localhost:3000/api/payment/notify",
        return_url: "http://localhost:3000/user/dashboard",
        cancel_url: "http://localhost:3000/user/dashboard",

        first_name: "Test",
        last_name: "User",
        email: "test@test.com",
        phone: "0771234567",
        address: "Colombo",
        city: "Colombo",
        country: "Sri Lanka",
       
      });

    }catch(err){
      console.error(err);
      alert("Payment Error")
    } 

}

  return (
    <div className="sm:p-8 p-3">
      <h1 className="text-xl font-bold mb-4 text-gray-700">Donate Here!</h1>
<form className="flex flex-col gap-4 sm:flex-row">
      <input
        type="number"
       
        placeholder="Enter amount" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mr-2 text-gray-600 placeholder:text-gray-400 rounded"
      />

      <button
      type="button"
      
        onClick={handleDonate}

        className="bg-green-600 text-white px-4 py-2 sm:ml-2 rounded hover:bg-green-500" 
      >
        Donate
      </button>
      <button
      type="reset"
       onClick={()=>setAmount("")}
        className="bg-yellow-600 text-white px-6 py-2 sm:ml-4 rounded hover:bg-yellow-500"
      >
        Reset
      </button>


</form>
    </div>
  );
}
