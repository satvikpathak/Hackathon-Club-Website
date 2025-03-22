import React, { useState } from "react";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { MessageCircle, Send, X } from "lucide-react";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { sender: "user", text: input };
        setMessages([...messages, newMessage]);

        try {
            const llm = new ChatGoogleGenerativeAI({
                model: "gemini-1.5-flash",
                apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
                temperature: 0.7,
                maxOutputTokens: 2048,
            });

            const websiteContext = `
                You are an AI chatbot integrated into the Hackathon Club website at CCET. This website is dedicated to helping students explore, participate in, and organize hackathons. It serves as a hub for innovation, collaboration, and skill development through coding competitions. Website Purpose & Features 📌 Upcoming Hackathons – View details of upcoming hackathons, including themes, dates, and participation guidelines. 🏆 Past Hackathons & Winners – Explore previous events, winners, and project highlights. 👨‍💻 Team Building – Find and connect with team members for hackathons. 🚀 Resources & Workshops – Access tutorials, guides, and mentorship programs to improve your skills. 🏫 College & Industry Collaboration – Stay updated on hackathons organized by the college or in partnership with tech companies. 🎤 Submit & Host Hackathons – Organize your own hackathon through the club and manage registrations. 🤝 Networking & Community – Join discussions, interact with mentors, and connect with like-minded innovators. Common User Queries You Should Handle: "What is the next hackathon at CCET?" "How can I register for a hackathon?" "Can I participate if I am a beginner?" "Where can I find hackathon resources?" "How do I submit my hackathon project?" "Who won the last hackathon?" Response Guidelines for the Chatbot: Always encourage students to participate and improve their skills. Provide accurate event details (if an API or database is available, fetch real-time data). Suggest resources, mentors, and team-building options. Guide users through the registration and submission process. Be welcoming and engaging to foster a vibrant hackathon culture. Keep the chat engaging and interactive, encouraging users to ask questions and provide feedback. Provide a clear and concise response to user queries, ensuring they are met with appropriate guidance and information.
            `;

            const response = await llm.invoke([
                new HumanMessage({ content: websiteContext + "\nUser: " + input })
            ]);

            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: response.content }]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Sorry, something went wrong!" }]);
        }

        setInput("");
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 h-96 bg-black border border-red-600 shadow-lg rounded-xl flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-red-700 text-white p-3 rounded-t-xl">
                        <h2 className="font-semibold">Hackathon AI</h2>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Box */}
                    <div className="flex-grow p-3 overflow-y-auto space-y-2 text-white">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg max-w-[75%] ${
                                    msg.sender === "user" ? "bg-red-600 ml-auto" : "bg-gray-800"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Box */}
                    <div className="flex items-center p-2 bg-gray-900 rounded-b-xl">
                        <input
                            type="text"
                            className="flex-grow p-2 text-white bg-gray-800 border border-gray-700 rounded-l focus:outline-none"
                            placeholder="Ask something..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button onClick={handleSend} className="bg-red-600 hover:bg-red-700 p-3 rounded-r">
                            <Send size={20} className="text-white" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
