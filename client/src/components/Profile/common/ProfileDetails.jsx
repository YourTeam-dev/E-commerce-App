import React, { useState } from "react";
import { upgradeProfile } from "../../../API/Auth";
import { Loader } from "lucide-react";
function ProfileDetails({ profile }) {
  const [showpdate, setshowUpdate] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [updateProfile, setupdateProfile] = useState({
    name: profile.name,
    email: profile.email,
    adress: profile.adress,
    phone: profile.phone,
  });
  const userType = profile.isAdmin
    ? "Admin"
    : profile.isSeller
    ? "Seller"
    : "Client";

  const handleSellerUpgrade = () => {
    setUpgradeLoading(true);
    upgradeProfile()
      .then(() => {
        setUpgradeLoading(false);
        window.location.reload();
      })
      .catch(() => {
        setUpgradeLoading(false);
      });
  };
  return (
    <div>
      <div className="flex flex-row items-center space-x-4 ">
        <h1 className="text-3xl font-bold text-gray-900 mr-auto">My Account</h1>
        <button onClick={() => setshowUpdate(!showpdate)} className="bg-[#d58a94] hover:bg-[#c27781] text-white font-bold py-2 px-4 rounded float-right">
          Edit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-bold mb-2">Name</label>
          <p className="text-gray-600">{profile.name}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-bold mb-2">Email</label>
          <p className="text-gray-600">{profile.email}</p>
        </div>
        {userType === "Seller" && (
          <>
            <div className="flex flex-col">
              <label className="text-gray-700 font-bold mb-2">Adress</label>
              <p className="text-gray-600">{profile.adress}</p>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <p className="text-gray-600">{profile.phoneNumber}</p>
            </div>
          </>
        )}
      </div>
      {userType === "Client" && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={handleSellerUpgrade}
            className=" mt-14 bg-[#d58a94] hover:bg-[#c27781] text-white font-bold py-2 px-4 rounded "
          >
            {upgradeLoading ? (
              <Loader className="animate-spin" />
            ) : (
              "Upgrade To Seller"
            )}
          </button>
        </div>
      )}
      {showpdate&&(
        <div>
          <div className="flex flex-col border-t border-[#d58a94] pt-4">
            <label className="text-gray-700 font-bold mb-2">Name</label>
            <input
              value={updateProfile.name}
              onChange={(e) =>
                setupdateProfile({ ...updateProfile, name: e.target.value })
              }
              type="text"
              className="border border-gray-400 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold mb-2">Email</label>
            <input
              value={updateProfile.email}
              onChange={(e) =>
                setupdateProfile({ ...updateProfile, email: e.target.value })
              }
              type="email"
              className="border border-gray-400 p-2 rounded"
            />
          </div>
          { userType === "Seller" &&
            <>
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold mb-2">Adress</label>
                <input
                  value={updateProfile.adress}
                  onChange={(e) =>
                    setupdateProfile({
                      ...updateProfile,
                      adress: e.target.value,
                    })
                  }
                  type="text"
                  className="border border-gray-400 p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold mb-2">
                  Phone Number
                </label>
                <input
                  value={updateProfile.phone}
                  onChange={(e) =>
                    setupdateProfile({
                      ...updateProfile,
                      phone: e.target.value,
                    })
                  }
                  type="text"
                  className="border border-gray-400 p-2 rounded"
                />
              </div>
            </>
          }
          <button
            onClick={() => setshowUpdate(!showpdate)}
            className=" mt-14 bg-[#d58a94] hover:bg-[#c27781] text-white font-bold py-2 px-4 rounded "
          >
            Save
          </button>
          {
            upgradeLoading&&(
              <Loader className="animate-spin" />
            )
          }
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
