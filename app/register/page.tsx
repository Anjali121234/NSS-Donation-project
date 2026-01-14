"use client"
 import { useRouter } from "next/navigation";
export default function RegisterPage() {
 
    const handleSubmit= async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     const form = e.currentTarget;
    const name = (form.name as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try{
        const a= await fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({name,email,password}),
        })
        const data = await a.json();
        if(!a.ok){
            alert(data.message||"registeration failed");
            return;
        }
        alert("registration successfull !please login.");
        router.push("/login");
    }
    catch(error){
        console.error("register error:",error);
        alert("somthing went wrong");
    }
};

    return(
           <div>
          
           <div className=" min-h-screen bg-gray-200 flex items-center justify-center">
               
               <div className="bg-white w-80 p-6 rounded-lg">
                   <form  className="flex flex-col gap-3"  onSubmit={handleSubmit}>
                   <input name="name" className="p-4 h-10  border text-black  rounded shadow placeholder-gray-400  " type="text" placeholder="Name" />
                    <input name="email" className="p-4 h-10  border text-black  rounded shadow placeholder-gray-400 " type="email" placeholder="Email" />
                    <input name="password" className="p-4 h-10  border text-black  rounded shadow placeholder-gray-400 " type="password" placeholder="Password" />
                    <button type="submit" className="bg-gray-500
                     text-white h-10 rounded shadow">Register as new user</button>
                    </form>
               </div>
               </div>
           </div>
  );
}