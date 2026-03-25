// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8088';

export const API_ENDPOINTS = {
 LOGIN: `${API_BASE_URL}/api/users/login`,
 USERS: `${API_BASE_URL}/api/users`,
 TASKS: `${API_BASE_URL}/api/tasks`,
 REWARDS: `${API_BASE_URL}/api/rewards`,
};

export default API_BASE_URL;
