// services/api.js
const API_BASE_URL = "https://hygienequestemdpoints.onrender.com";

export const fetchAttendanceData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendances`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
};
