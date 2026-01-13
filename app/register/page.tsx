"use client"
 
export default function RegisterPage() {
 
    return(
           <div>
          
           <div className=" min-h-screen bg-gray-200 flex items-center justify-center">
               
               <div className="bg-white w-80 p-6 rounded-lg">
                   <form  className="flex flex-col gap-3">
                   <input  className="p-4 h-10  border rounded shadow placeholder-gray-400  " type="text" placeholder="Name" />
                    <input  className="p-4 h-10  border rounded shadow placeholder-gray-400 " type="email" placeholder="Email" />
                    <input  className="p-4 h-10  border rounded shadow placeholder-gray-400 " type="password" placeholder="Password" />
                    <button className="bg-gray-500
                     text-white h-10 rounded shadow">Login</button>
                    </form>
               </div>
               </div>
           </div>
  );
}