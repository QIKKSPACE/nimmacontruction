// Central API configuration — all URLs are derived from VITE_API_BASE_URL in .env
// To deploy: change VITE_API_BASE_URL in .env and rebuild. No other file needs touching.

export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export const API = {
  projects:  `${API_BASE.replace(/\/$/, '')}/projects.php`,
  enquiries: `${API_BASE.replace(/\/$/, '')}/enquiries.php`,
  leads:     `${API_BASE.replace(/\/$/, '')}/leads.php`,
  invoices:  `${API_BASE.replace(/\/$/, '')}/invoices.php`,
  upload:    `${API_BASE.replace(/\/$/, '')}/upload.php`,
  hero:      `${API_BASE.replace(/\/$/, '')}/hero.php`,
  login:     `${API_BASE.replace(/\/$/, '')}/login.php`,
  verify:    `${API_BASE.replace(/\/$/, '')}/verify.php`,
};
