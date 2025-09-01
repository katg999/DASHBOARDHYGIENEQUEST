// examples/Charts/BarCharts/AttendanceByDistrictChart.js
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AttendanceByDistrictChart({ attendanceData, usersData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Present",
        data: [],
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        label: "Absent",
        data: [],
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Check if data exists and has the expected structure
    let attendanceArray = [];
    let usersArray = [];

    if (attendanceData && typeof attendanceData === "object") {
      if (Array.isArray(attendanceData)) {
        attendanceArray = attendanceData;
      } else if (attendanceData.data && Array.isArray(attendanceData.data)) {
        attendanceArray = attendanceData.data;
      }
    }

    if (usersData && typeof usersData === "object") {
      if (Array.isArray(usersData)) {
        usersArray = usersData;
      } else if (usersData.data && Array.isArray(usersData.data)) {
        usersArray = usersData.data;
      }
    }

    if (attendanceArray.length > 0 && usersArray.length > 0) {
      // Process data for the chart
      const districtMap = new Map();
      const phoneToDistrict = {};

      // Create phone to district mapping
      usersArray.forEach((user) => {
        if (user && user.phone) {
          phoneToDistrict[user.phone] = user.district || "Unknown District";
        }
      });

      // Process attendance data
      attendanceArray.forEach((record) => {
        if (record && record.phone) {
          const district = phoneToDistrict[record.phone] || "Unknown District";
          const present = parseInt(record.students_present) || 0;
          const absent = parseInt(record.students_absent) || 0;

          if (!districtMap.has(district)) {
            districtMap.set(district, {
              present: 0,
              absent: 0,
              total: 0,
            });
          }

          const districtData = districtMap.get(district);
          districtData.present += present;
          districtData.absent += absent;
          districtData.total += present + absent;
        }
      });

      // Convert to arrays for chart
      const districts = Array.from(districtMap.keys());
      const presentData = districts.map((district) => districtMap.get(district).present);
      const absentData = districts.map((district) => districtMap.get(district).absent);

      setChartData({
        labels: districts,
        datasets: [
          {
            label: "Present",
            data: presentData,
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            borderWidth: 1,
          },
          {
            label: "Absent",
            data: absentData,
            backgroundColor: "#FF6384",
            borderColor: "#FF6384",
            borderWidth: 1,
          },
        ],
      });
    } else {
      // If no data, set empty chart
      setChartData({
        labels: ["No data available"],
        datasets: [
          {
            label: "Present",
            data: [0],
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            borderWidth: 1,
          },
          {
            label: "Absent",
            data: [0],
            backgroundColor: "#FF6384",
            borderColor: "#FF6384",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [attendanceData, usersData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          boxWidth: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw || 0;

            // Check if we're showing the "no data" placeholder
            if (context.label === "No data available") {
              return "No district data available";
            }

            return `${label}: ${value} students`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Districts",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Students",
        },
      },
    },
  };

  return (
    <MDBox>
      <MDTypography variant="h6" fontWeight="medium" textAlign="center" mb={2}>
        Attendance by District
      </MDTypography>
      <MDBox sx={{ height: "300px" }}>
        <Bar data={chartData} options={options} />
      </MDBox>
    </MDBox>
  );
}

// Add PropTypes validation
AttendanceByDistrictChart.propTypes = {
  attendanceData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
    }),
  ]),
  usersData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
    }),
  ]),
};

AttendanceByDistrictChart.defaultProps = {
  attendanceData: [],
  usersData: [],
};

export default AttendanceByDistrictChart;
