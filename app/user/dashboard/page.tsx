"use client"

import { useEffect,useState } from "react";
import Link from "next/link";
type Donation={
    _id:string,
    amount:number,
    status:"success"|"pending"|"failed";
    createdAt:string;
}
export default  function UserDashboard() {
    const [donations,setdonations]=useState<Donation[]>([]);

    useEffect(()=>{
        fetch("/api/user/donations")
        .then((res)=>res.json())
        .then((data)=>setdonations(data));
    },[])

    const latestDonation=donations[0];

   
       return (
    <div className="p-2 sm:p-4 md:p-8 space-y-6">
      <h1 className=" text-lg md:text-xl font-bold text-black">User Dashboard</h1>
      <div className="bg-white p-2 md:p-4 text-black rounded shadow mb-3">
        <h2 className="font-semibold mb-2 text-gray-600  text-lg ">Latest Donation</h2>
        
        {
            latestDonation ?(
               <p className="flex items-center gap-5 pb-2">
            ₹{donations[0].amount}  
            <span className={`font-semibold ${latestDonation.status==="success"  && "bg-green-100 text-sm p-1 rounded text-green-700"} 
            ${latestDonation.status==="failed"  && "bg-red-100 text-sm p-1 rounded text-red-700"}
             ${latestDonation.status==="pending"  && "bg-yellow-100 text-sm p-1 rounded text-yellow-700"}`}>
              {latestDonation.status.toUpperCase()}
            </span>
          </p>
        ) : (
          <p className="text-red-400">No donations yet</p>
        )}
          
        </div>
            <div className="bg-white rounded shadow overflow-x-auto">
        <h2 className="font-semibold sm:mb-3 mb-1 pt-2 sm:pt-4 md:pl-3 pl-1  text-lg text-gray-600">Donation History</h2>
        {
            donations.length===0 ? (
              <div>

                <p className="text-gray-400 px-5 py-5"> Start your first donation and make a difference 💚</p>
                 <Link href="/user/donations"
      className="mt-4 inline-block bg-green-600 text-white m-4 px-4 p-2 rounded hover:bg-green-700 transition"
    >
      Donate Now
    </Link></div>
            ) :(

                <table  className=" w-full min-w-[600px] sm:min-w-[700px] md:min-w-full border-b  border-gray-300">
                    <thead>
                        <tr  className="text-black w-full border-b-1 border-gray-300 bg-gray-200">
                            <th className="text-left  md:p-2 md:px-6 py-4 px-3 sm:px-3">Amount</th>
                            <th className="text-left md:p-2 md:px-6 px-7 py-4">Status</th>
                            <th className="text-left md:p-2 md:x-6 px-7 py-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((record)=>(
                         <tr key={record._id} className="border-b text-gray-600 border-gray-200 hover:bg-gray-100 ">
                        <td className="p-2 px-6 py-4">₹{record.amount}</td>
                     <td className="px-6 py-4">
                   <span
                    className={`px-2 py-1 rounded text-sm font-semibold
                      ${record.status === "success" && "bg-green-100 text-green-700"}
                      ${record.status === "pending" && "bg-yellow-100 text-yellow-700"}
                      ${record.status === "failed" && "bg-red-100 text-red-700"}
                    `}
                  >
                    {record.status.toUpperCase()}
                  </span></td>
                  <td className="p-2">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </td>
                            </tr>
                       ) )}
                    </tbody>
                </table>


            )
                    }
        </div>
        </div>
    );
}