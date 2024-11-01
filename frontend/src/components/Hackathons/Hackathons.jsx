import React, { useState } from "react";

function Hackathons() {
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const hackathons = [
    {
      title: "Microsoft Fabric and AI Learning Hackathon",
      timeLeft: "12 days left",
      location: "Online",
      prize: "$10,000",
      participants: "4163 participants",
      tags: ["Beginner Friendly", "Databases", "Machine Learning/AI"],
      description:
        "An exciting hackathon to explore Microsoft Fabric and AI technologies.",
    },
    {
      title: "Google Chrome Built-in AI Challenge",
      timeLeft: "about 1 month left",
      location: "Online",
      prize: "$65,000",
      participants: "3799 participants",
      tags: ["Machine Learning/AI", "Web", "Beginner Friendly"],
      description: "Join the challenge to innovate with AI in Google Chrome.",
    },
    {
      title: "She Builds AI",
      timeLeft: "13 days left",
      location: "Online",
      prize: "$15,000",
      participants: "2000 participants",
      tags: ["Social Good", "AI", "Women in Tech"],
      description: "Empower women in tech through AI development.",
    },
  ];

  const handleCardClick = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const handleCloseDetails = () => {
    setSelectedHackathon(null);
  };

  return (
    <div className="min-h-screen  text-white p-8">
      <h1 className="text-4xl mb-8 font-bold animate__animated animate__fadeIn">
        Hackathons You Can See Here
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hackathons.map((hackathon, index) => (
          <div
            key={index}
            className="bg-stone-950 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 hover:bg-gradient-to-br from-red-700 to-red-500"
            onClick={() => handleCardClick(hackathon)}
          >
            <h2 className="text-2xl font-semibold mb-2">{hackathon.title}</h2>
            <p className="text-sm text-stone-400 mb-4">{hackathon.timeLeft}</p>
            <p className="text-lg mb-2">{hackathon.location}</p>
            <p className="text-lg font-bold mb-4">{hackathon.prize}</p>
            <p className="text-sm text-stone-400 mb-4">
              {hackathon.participants}
            </p>
            <div className="flex flex-wrap gap-2">
              {hackathon.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-stone-700 text-sm px-3 py-1 rounded-full transition-transform transform hover:scale-110"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedHackathon && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate__animated animate__fadeIn">
          <div className="bg-stone-800 rounded-lg p-6 w-11/12 md:w-1/2 shadow-xl transform transition-transform duration-300 scale-100 hover:scale-105">
            <h2 className="text-3xl font-semibold mb-2">
              {selectedHackathon.title}
            </h2>
            <p className="text-sm text-stone-400 mb-4">
              {selectedHackathon.timeLeft}
            </p>
            <p className="text-lg mb-2">{selectedHackathon.location}</p>
            <p className="text-lg font-bold mb-4">{selectedHackathon.prize}</p>
            <p className="text-sm text-stone-400 mb-4">
              {selectedHackathon.participants}
            </p>
            <p className="text-sm text-stone-300 mb-4">
              {selectedHackathon.description}
            </p>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
                Register
              </button>
              <button
                onClick={handleCloseDetails}
                className="ml-4 bg-stone-700 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hackathons;
