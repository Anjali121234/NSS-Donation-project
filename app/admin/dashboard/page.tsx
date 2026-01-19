"use client"
import { useEffect,useState } from "react";
import StatsChart from "@/components/StatChart";


type stats = {
  totalUsers: number;
  successDonations: number;
  pendingDonations: number;
  failedDonations: number;
};

export default function AdminDashboard() {
    const [stats,setstats]=useState<any>(null);
      const [loading, setLoading] = useState(true);
    
       useEffect(() => {
  fetch("/api/admin/stats")
    .then((res) => res.json())   
    .then((data) => {
      setstats(data);
      setLoading(false);        
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);

          if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-8">Failed to load stats</div>;
  }
    return (
       <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard className="bg-white" title="Total Users" value={stats.totalUsers} />
        <StatCard className="bg-white" title="Total Amount Recieved in ₹" value={stats.totalAmount} />
        <StatCard className="bg-white" title="Total Pending Amount in ₹" value={stats.totalPendingAmount} />
        <StatCard
          title="Donations Recieved Successfully"
          value={stats.successDonations}
          className="bg-green-300"
        />
        <StatCard className="bg-yellow-100" title="Pending Donations" value={stats.pendingDonations} />
        <StatCard className="bg-red-300" title="Failed Donations"  value={stats.failedDonations} />
      </div>
      <StatsChart
    success={stats.successDonations}
    pending={stats.pendingDonations}
    failed={stats.failedDonations}
  />
    </div>
  
    );
}
 
function StatCard({title,value,   className = "",}:{title:string; value:number; className?:string})
{
    return( 
         <div  className={` rounded shadow p-6 text-black ${className} `}>
      <p className="text-gray-500 text-xl">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
    );
}