import React from "react";

const UserOverview = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Seller Info</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Store:</strong> John's Store</p>
      </div>
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Update Info
      </button>
    </div>
  );
};
export default UserOverview;
