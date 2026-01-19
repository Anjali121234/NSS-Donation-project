"use client"
import {useEffect,useState  } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
};
export default function AdminUserPage(){
    const [users,setUsers]=useState<User[]>([]);
     const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch("/api/admin/users")
        .then((res)=>res.json())
        .then((data)=>{setUsers(data);
            setLoading(false);
        })
        .catch(()=>setLoading(false));

    },[])

      if (loading) return <div className="p-8">Loading users...</div>;

      return (
    <div className="p-2 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-black">All Users</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          
          <thead>
            <tr className="border-b bg-gray-100 border-gray-400 text-black text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 text-gray-600 hover:bg-gray-50 ">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
