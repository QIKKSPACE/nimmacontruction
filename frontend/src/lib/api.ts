// Central API configuration — all URLs are derived from VITE_API_BASE_URL in .env
// To deploy: change VITE_API_BASE_URL in .env and rebuild. No other file needs touching.

export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export const API = {
  projects:  `${API_BASE}/projects.php`,
  enquiries: `${API_BASE}/enquiries.php`,
  upload:    `${API_BASE}/upload.php`,
  hero:      `${API_BASE}/hero.php`,
  login:     `${API_BASE}/login.php`,
  verify:    `${API_BASE}/verify.php`,
};
