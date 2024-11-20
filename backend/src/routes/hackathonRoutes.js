import express from "express";
import puppeteer from "puppeteer";
import axios from "axios";
const router = express.Router();

// Function to scrape hackathon data
const scrapeHackathonData = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Update the selectors as per the site's structure
    const title = await page.$eval("h1", (el) => el.innerText);
    const timeLeft = await page.$eval(".time-left", (el) => el.innerText);
    const location = await page.$eval(".location", (el) => el.innerText);
    const participants = await page.$eval(".participants", (el) => el.innerText);
    const prize = await page.$eval(".prize", (el) => el.innerText);

    await browser.close();

    return { title, timeLeft, location, participants, prize };
  } catch (error) {
    console.error("Error scraping data:", error);
    return null;
  }
};

// Route to fetch and process hackathon data
router.post("/fetch-hackathon", async (req, res) => {
  const { url } = req.body;

  try {
    const scrapedData = await scrapeHackathonData(url);

    if (!scrapedData) {
      return res.status(500).json({ error: "Failed to scrape data." });
    }

    // Pass scraped data to ChatGPT API
    const chatResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an assistant that formats and enhances hackathon data.",
          },
          {
            role: "user",
            content: `Transform this raw hackathon data into a detailed format: ${JSON.stringify(
              scrapedData
            )}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const enhancedData = JSON.parse(chatResponse.data.choices[0].message.content);
    res.json(enhancedData);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Failed to process data." });
  }
});

export default router;
