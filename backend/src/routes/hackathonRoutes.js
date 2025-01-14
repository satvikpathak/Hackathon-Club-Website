import express from 'express';
import axios from 'axios';
const router = express.Router();

// Create axios instance with common configs
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
  timeout: 5000 // 5 second timeout
});

// Function to fetch hackathons from Unstop
async function fetchUnstopData(page = 1) {
  try {
    const response = await axiosInstance.get('https://unstop.com/api/public/opportunity/search-result', {
      params: {
        opportunity: 'hackathons',
        per_page: 100, // Increased page size
        oppstatus: 'open',
        quickApply: true,
        page: page,
      }
    });
    return formatHackathonData(response.data);
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error.message);
    return [];
  }
}

// Optimized format function with fewer operations
function formatHackathonData(rawData) {
  if (!rawData?.data?.data) return [];
  
  return rawData.data.data.map(({
    title = '',
    filters = [],
    start_date,
    status = '',
    region = '',
    jobDetail = {},
    seo_url = '',
    registerCount = 0,
    organisation = {}
  }) => {
    const themes = filters
      .filter(filter => filter.type !== 'eligible')
      .map(filter => filter.name);
    
    const mode = region?.toLowerCase() === 'online' ? 'Online' : 'Offline';
    
    return {
      title,
      theme: themes,
      startDate: new Date(start_date),
      stringDate: new Date(start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status,
      mode,
      location: mode === 'Online' ? 'Online' : jobDetail?.locations?.[0] || 'Not specified',
      link: seo_url,
      participants: registerCount,
      organiser: organisation?.name || '',
      website: 'Unstop'
    };
  });
}

// Parallel fetching of hackathons
async function Unstop() {
  try {
    // First fetch to get initial data and determine total pages
    const firstPage = await fetchUnstopData(1);
    if (!firstPage.length) return [];

    // Fetch next 3 pages in parallel (adjust based on API limits)
    const additionalPages = await Promise.all([
      fetchUnstopData(2),
      fetchUnstopData(3),
      fetchUnstopData(4)
    ]);

    return [...firstPage, ...additionalPages.flat()];
  } catch (error) {
    console.error('Error in parallel fetching:', error);
    return [];
  }
}

// Implement caching
let cachedHackathons = null;
let lastCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// POST route to fetch hackathons
router.post('/fetch-hackathons', async (req, res) => {
  try {
    // Check cache
    if (cachedHackathons && lastCacheTime && (Date.now() - lastCacheTime < CACHE_DURATION)) {
      return res.status(200).json({
        total: cachedHackathons.length,
        hackathons: cachedHackathons,
        source: 'cache'
      });
    }

    // Fetch new data
    const hackathons = await Unstop();
    
    // Update cache
    cachedHackathons = hackathons;
    lastCacheTime = Date.now();

    res.status(200).json({
      total: hackathons.length,
      hackathons: hackathons,
      source: 'fresh'
    });
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    res.status(500).json({ error: 'Failed to fetch hackathons' });
  }
});

export default router;