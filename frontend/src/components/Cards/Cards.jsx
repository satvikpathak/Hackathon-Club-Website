// Cards.jsx
import React from "react";

const cardData = [
  {
    title: "UPCOMING HACKATHON 1",
    description: "Short description Skills the upcoming hackathon",
    imageUrl:
      "https://images.pexels.com/photos/29079253/pexels-photo-29079253/free-photo-of-cyclist-in-motion-at-night-in-brisbane.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "UPCOMING HACKATHON 2",
    description: "Another description Skills the hackathon.",
    imageUrl: "https://via.placeholder.com/256x128",
  },
  {
    title: "UPCOMING HACKATHON 3",
    description: "Description for the third hackathon.",
    imageUrl: "https://via.placeholder.com/256x128",
  },
];

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-black text-white rounded-lg w-full p-0 m-2 shadow-md flex flex-col">
      {/* Image Section */}
      <div className="h-48">
        <img
          src={imageUrl}
          alt="Hackathon"
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      {/* Content Section */}
      <div className="flex-grow p-5 text-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-stone-300 my-3">{description}</p>
      </div>
      {/* Button Section */}
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
      {cardData.map((card, index) => (
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
