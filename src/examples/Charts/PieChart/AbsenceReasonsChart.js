import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types"; // Add this import

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function AbsenceReasonsChart({ attendanceData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#7CFC00",
          "#20B2AA",
          "#FF6B6B",
          "#48DBFB",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#7CFC00",
          "#20B2AA",
          "#FF6B6B",
          "#48DBFB",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Check if attendanceData exists and has the expected structure
    // Handle both { data: [...] } format and direct array
    let dataArray = [];

    if (attendanceData && typeof attendanceData === "object") {
      if (Array.isArray(attendanceData)) {
        dataArray = attendanceData;
      } else if (attendanceData.data && Array.isArray(attendanceData.data)) {
        dataArray = attendanceData.data;
      }
    }

    if (dataArray.length > 0) {
      // Process absence reasons data
      const reasonsCount = {};

      dataArray.forEach((record) => {
        if (record && record.absence_reason) {
          // Clean up the reason text
          const reason = record.absence_reason.toString().trim().toLowerCase();
          const absentCount = parseInt(record.students_absent) || 0;

          if (reason && absentCount > 0) {
            if (reasonsCount[reason]) {
              reasonsCount[reason] += absentCount;
            } else {
              reasonsCount[reason] = absentCount;
            }
          }
        }
      });

      // Sort by count and get top reasons
      const sortedReasons = Object.entries(reasonsCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8); // Top 8 reasons

      const labels = sortedReasons.map(
        ([reason]) => reason.charAt(0).toUpperCase() + reason.slice(1)
      );
      const data = sortedReasons.map(([, count]) => count);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#7CFC00",
              "#20B2AA",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#7CFC00",
              "#20B2AA",
            ],
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
            data: [1],
            backgroundColor: ["#C9CBCF"],
            hoverBackgroundColor: ["#C9CBCF"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [attendanceData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
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
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);

            // Check if we're showing the "no data" placeholder
            if (label === "No data available") {
              return "No attendance data available";
            }

            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} students (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <MDBox>
      <MDTypography variant="h6" fontWeight="medium" textAlign="center" mb={2}>
        Absence Reasons
      </MDTypography>
      <MDBox sx={{ height: "300px" }}>
        <Pie data={chartData} options={options} />
      </MDBox>
    </MDBox>
  );
}

// Add PropTypes validation
AbsenceReasonsChart.propTypes = {
  attendanceData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
    }),
  ]),
};

AbsenceReasonsChart.defaultProps = {
  attendanceData: [],
};

export default AbsenceReasonsChart;
