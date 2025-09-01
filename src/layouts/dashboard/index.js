/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card"; // ADD THIS IMPORT

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import AbsenceReasonsChart from "examples/Charts/PieChart/AbsenceReasonsChart";
import AttendanceByDistrictChart from "examples/Charts/BarCharts/AttendanceByDistrictChart";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// API base URL
const API_BASE_URL = "https://hygienequestemdpoints.onrender.com";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [attendanceData, setAttendanceData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchData();

    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from your API
      const [usersResponse, attendanceResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/registrations`),
        fetch(`${API_BASE_URL}/attendances`),
      ]);

      if (!usersResponse.ok || !attendanceResponse.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const [users, attendance] = await Promise.all([
        usersResponse.json(),
        attendanceResponse.json(),
      ]);

      setUsersData(users);
      setAttendanceData(attendance);
      setSuccess("Data loaded successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Using sample data instead.");

      // Fallback to sample data
      const mockAttendance = [
        {
          id: 1,
          phone: "0772207616",
          students_present: 30,
          students_absent: 2,
          absence_reason: "2 students sick",
          topic_covered: "Personal Hygiene",
        },
        {
          id: 2,
          phone: "0772207616",
          students_present: 18,
          students_absent: 21,
          absence_reason: "bad weather, it was raining too much",
          topic_covered: "Simultaneous Equations",
        },
        {
          id: 3,
          phone: "0772207616",
          students_present: 12,
          students_absent: 14,
          absence_reason: "bad weather",
          topic_covered: "simulatenous equations",
        },
        {
          id: 4,
          phone: "0772207616",
          students_present: 14,
          students_absent: 64,
          absence_reason: "simulatenous Equations",
          topic_covered: "Mathematics",
        },
        {
          id: 5,
          phone: "0772207616",
          students_present: 1,
          students_absent: 12,
          absence_reason: "poor weather",
          topic_covered: "simultaneous equations",
        },
        {
          id: 6,
          phone: "0772207616",
          students_present: 12,
          students_absent: 34,
          absence_reason: "poor weather",
          topic_covered: "equations",
        },
        {
          id: 7,
          phone: "0772207616",
          students_present: 12,
          students_absent: 10,
          absence_reason: "equations",
          topic_covered: "algebraic equations",
        },
        {
          id: 8,
          phone: "0772207616",
          students_present: 10,
          students_absent: 10,
          absence_reason: "equations",
          topic_covered: "algrebaoc equations",
        },
        {
          id: 9,
          phone: "0772207616",
          students_present: 10,
          students_absent: 10,
          absence_reason: "poor weather",
          topic_covered: "equations",
        },
      ];

      const mockUsers = [
        {
          id: 1,
          phone: "0772207616",
          name: "Katende Brian",
          school: "St.Marys",
          district: "Kampala",
          language: "English",
        },
        {
          id: 3,
          phone: "0774405405",
          name: "John Doe",
          school: "Kampala Primary",
          district: "Wakiso",
          language: "English",
        },
        {
          id: 4,
          phone: "0700677231",
          name: "Charity Atuheire",
          school: "mary ss",
          district: "kanungu",
          language: "English",
        },
        {
          id: 5,
          phone: "0708210793",
          name: "yeah that's",
          school: "Luweero primary",
          district: "Luweero",
          language: "English",
        },
      ];

      setAttendanceData(mockAttendance);
      setUsersData(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalPresent = attendanceData.reduce((sum, item) => sum + (item.students_present || 0), 0);
  const totalAbsent = attendanceData.reduce((sum, item) => sum + (item.students_absent || 0), 0);
  const totalAttendance = totalPresent + totalAbsent;
  const attendanceRate =
    totalAttendance > 0 ? ((totalPresent / totalAttendance) * 100).toFixed(1) : 0;
  const totalSchools = [...new Set(usersData.map((user) => user.school))].length;
  const totalDistricts = [...new Set(usersData.map((user) => user.district))].length;
  const totalTeachers = [...new Set(attendanceData.map((item) => item.phone))].length;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {error && (
          <MDAlert color="error" dismissible onClose={() => setError(null)}>
            {error}
          </MDAlert>
        )}

        {success && (
          <MDAlert color="success" dismissible onClose={() => setSuccess(null)}>
            {success}
          </MDAlert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="school"
                title="Total Present"
                count={totalPresent}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "students attended",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="person_off"
                title="Total Absent"
                count={totalAbsent}
                percentage={{
                  color: "error",
                  amount: "",
                  label: "students absent",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="trending_up"
                title="Attendance Rate"
                count={`${attendanceRate}%`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "overall attendance",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="location_city"
                title="Schools"
                count={totalSchools}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `across ${totalDistricts} districts`,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <MDBox p={3}>
                  <AbsenceReasonsChart attendanceData={attendanceData} />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <MDBox p={3}>
                  <AttendanceByDistrictChart
                    attendanceData={attendanceData}
                    usersData={usersData}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects attendanceData={attendanceData} usersData={usersData} loading={loading} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview attendanceData={attendanceData} loading={loading} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
