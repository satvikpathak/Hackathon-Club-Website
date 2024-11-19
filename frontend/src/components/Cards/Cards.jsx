import React from "react";
import hackathonData from "../hackathonData.js";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-black text-white rounded-lg w-full p-0 m-2 shadow-md flex flex-col">
      <div className="h-48">
        <img
          src={imageUrl}
          alt="Hackathon"
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex-grow p-5 text-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-stone-300 my-3">{description}</p>
      </div>
      <div className="flex justify-center p-2 gap-4">
        <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
          Register
        </button>
        <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="flex flex-wrap justify-end p-5 gap-4">
      {hackathonData.map((card, index) => (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" key={index}>
          <Card
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
