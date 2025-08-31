// src/layouts/tables/index.js
import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data and services
import authorsTableData from "layouts/tables/data/authorsTableData";
import { fetchAttendanceData } from "services/api";

// Use the existing ReportsBarChart
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

function Tables() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: { label: "Absence Frequency", data: [] },
  });

  useEffect(() => {
    const getAttendanceData = async () => {
      try {
        setLoading(true);
        const data = await fetchAttendanceData();
        setAttendanceData(data);

        // Process data for the chart
        processChartData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch attendance data:", err);
        setError("Failed to load attendance data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const processChartData = (data) => {
      if (data && data.length > 0) {
        // Process data to extract absence reasons
        const reasonCounts = {};

        data.forEach((item) => {
          if (item.absence_reason) {
            // Simple parsing - you might want to improve this based on your actual data structure
            const reasons = item.absence_reason.split(",");
            reasons.forEach((reason) => {
              const cleanReason = reason.trim().toLowerCase();
              if (cleanReason) {
                reasonCounts[cleanReason] = (reasonCounts[cleanReason] || 0) + 1;
              }
            });
          }
        });

        // Sort reasons by frequency and take top 6 for the chart
        const sortedReasons = Object.entries(reasonCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6);

        const labels = sortedReasons.map(
          ([reason]) => reason.charAt(0).toUpperCase() + reason.slice(1)
        );
        const counts = sortedReasons.map(([_, count]) => count);

        setChartData({
          labels: labels,
          datasets: {
            label: "Absence Frequency",
            data: counts,
          },
        });
      }
    };

    getAttendanceData();

    // Optional: Set up polling to refresh data periodically
    const intervalId = setInterval(getAttendanceData, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  const { columns, rows } = authorsTableData(attendanceData);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Attendance In Uganda
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox p={3} textAlign="center">
                    <MDTypography variant="body2">Loading attendance data...</MDTypography>
                  </MDBox>
                ) : error ? (
                  <MDBox p={3} textAlign="center">
                    <MDTypography variant="body2" color="error">
                      {error}
                    </MDTypography>
                  </MDBox>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Absence Reasons Analysis
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={2}>
                {attendanceData.length > 0 ? (
                  <ReportsBarChart
                    color="info"
                    title="Top Absence Reasons"
                    description="Most common reasons for student absences"
                    date="updated just now"
                    chart={chartData}
                  />
                ) : (
                  <MDTypography variant="body2" textAlign="center" p={3}>
                    No data available for chart
                  </MDTypography>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
