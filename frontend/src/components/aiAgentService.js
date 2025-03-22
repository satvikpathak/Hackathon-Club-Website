import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { DynamicTool } from "@langchain/core/tools";

export class aiAgentService {
  
  // Store AI agent instance
  agentInstance = null;

  async createLangChainAgent(threadId = null, messageModifier = null) {
    try {
      const llm = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-flash",
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY || "your_fallback_api_key",
        temperature: 0.7,
        maxOutputTokens: 2048,
    });    

      const memory = new MemorySaver(); // Keeps track of conversation state

      const tools = [
        new DynamicTool({
          name: "search_hackathons",
          description: "Search for upcoming hackathons",
          func: async (query) => {
            return `Currently, no live hackathons found for: ${query}`;
          },
        }),
        new DynamicTool({
          name: "mentor_advice",
          description: "Provide mentorship advice",
          func: async (topic) => {
            return `Advice on ${topic}: Stay consistent, network well, and keep coding!`;
          },
        }),
      ];

      const agent = createReactAgent({
        llm,
        tools,
        checkpointSaver: memory,
        messageModifier: messageModifier || `You are an AI assistant for the Hackathon Club website. Guide users with hackathon-related queries.`,
      });

      this.agentInstance = agent;
      return agent;
    } catch (error) {
      console.error("Error creating AI Agent:", error);
      throw error;
    }
  }

  async processQuery(query, threadId = null) {
    try {
      const conversationThreadId =
        threadId || `thread_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const agent = await this.createLangChainAgent(conversationThreadId);

      const config = {
        configurable: {
          thread_id: conversationThreadId,
        },
      };

      const result = await agent.invoke(
        {
          messages: [new HumanMessage(query)],
        },
        config
      );

      return {
        content: result.messages.map((msg) => msg.content).join("\n"),
        threadId: conversationThreadId,
      };
    } catch (error) {
      console.error("Error processing query:", error);
      throw error;
    }
  }
}
