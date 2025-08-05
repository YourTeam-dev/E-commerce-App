import React, { useState, useEffect, use } from "react";
import { Loader } from "lucide-react";
import HeroUpdate from "./HeroUpdate";
import HeroAdd from "./HeroAdd";
import { deleteHero, getHeroSlider } from "../../../API/Hero";
import { getAllCategories } from "../../../API/Category";
function HeroManagement() {
  const baseUrl = process.env.REACT_APP_IMAGE_URL;
  const [heros, setHeros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateHero, setUpdateHero] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    getHeroSlider()
      .then((data) => {
        setHeros(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  console.log("heros", heros);
  if (loading) {
    return <Loader className="animate-spin justify-center" />;
  }
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          Heroes Management({heros.length})
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowAdd(true);
            setUpdateHero(null);
          }}
        >
          Add Hero
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">subtitle</th>
            <th className="p-2">description</th>
            <th className="p-2">image</th>
            <th className="p-2">category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {heros.map((h) => (
            <tr key={h._id} className="border-t relative">
              <td className="p-2">{h.title}</td>
              <td className="p-2">{h.subtitle}</td>
              <td className="p-2">{h.description}</td>
              <td
                className="p-2"
                onClick={() => {
                  setShowImage(!showImage);
                  setImage(h.image);
                }}
              >
                {h.image}
              </td>
              <td className="p-2">{h.category}</td>
              <td className="p-2 space-x-3">
                <button
                  className="text-yellow-600 hover:underline "
                  onClick={() => {
                    setShowUpdate(true);
                    setUpdateHero(h);
                  }}
                >
                  update
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => {
                    deleteHero(h._id)
                      .then(() => {
                        setHeros(heros.filter((hero) => hero._id !== h._id));
                      })
                      .catch((error) => {
                        console.error("Error deleting hero:", error);
                      });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowImage(false)}
          ></div>
          <img src={`${baseUrl}${image}`} alt="Hero" className="max-w-full max-h-full" />
        </div>
      )}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <HeroAdd category={category} close={() => setShowAdd(false)} />
        </div>
      )}
      {showUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <HeroUpdate category={category} hero={updateHero} close={() => setShowUpdate(false)} />
        </div>
      )}
    </div>
  );
}

export default HeroManagement;
