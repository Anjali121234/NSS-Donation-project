"use client";

import { useEffect, useState } from "react";

type Donation = {
  _id: string;
  amount: number;
  status: "success" | "pending" | "failed";
  createdAt: string;
  userId: {
    name: string;
    email: string;
  };
};

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filter, setFilter] = useState<"all" | "success" | "pending" | "failed">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/donations")
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredDonations =
    filter === "all"
      ? donations
      : donations.filter((d) => d.status === filter);

  if (loading) return <div className="p-8">Loading donations...</div>;

  return (
    <div className="p-2 sm:p-8 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-black">All Donations</h1>

      <div className="flex gap-4">
        {["all", "success", "pending", "failed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-2 sm:px-4 py-2 rounded font-semibold text-sm 
              ${filter === status
                ? "bg-black text-white"
                : "bg-gray-200 text-black"}
            `}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded shadow ">
        <table className="w-full border-collapse ">
          <thead>
            <tr className="border-b bg-gray-100 text-left border-gray-300 text-black">
              <th className="p-3 ">Donor</th>
              <th className="p-3">Email</th>
              <th className="p-3 ">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonations.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No donations found
                </td>
              </tr>
            )}

            {filteredDonations.map((d) => (
              <tr key={d._id} className="border-b border-gray-200 hover:bg-gray-50 text-gray-600">
                <td className="p-3">{d.userId.name || "Unknown"}</td>
                <td className="p-3">{d.userId.email || "-"}</td>
                <td className="p-3">₹{d.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold
                      ${d.status === "success" && "bg-green-100 text-green-700"}
                      ${d.status === "pending" && "bg-yellow-100 text-yellow-700"}
                      ${d.status === "failed" && "bg-red-100 text-red-700"}
                    `}
                  >
                    {d.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
