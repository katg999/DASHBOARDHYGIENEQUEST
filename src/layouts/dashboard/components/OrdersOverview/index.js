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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview({ attendanceData = [], loading = false }) {
  // Get the latest 5 attendance records
  const recentRecords = attendanceData.slice(-5).reverse();

  // Function to get icon based on attendance rate
  const getIcon = (present, absent) => {
    const total = present + absent;
    const rate = total > 0 ? (present / total) * 100 : 0;

    if (rate >= 70) return "check_circle";
    if (rate >= 50) return "warning";
    return "error";
  };

  // Function to get color based on attendance rate
  const getColor = (present, absent) => {
    const total = present + absent;
    const rate = total > 0 ? (present / total) * 100 : 0;

    if (rate >= 70) return "success";
    if (rate >= 50) return "warning";
    return "error";
  };

  if (loading) {
    return (
      <Card sx={{ height: "100%" }}>
        <MDBox pt={3} px={3}>
          <MDTypography variant="h6" fontWeight="medium">
            Recent Attendance
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Loading data...
          </MDTypography>
        </MDBox>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Recent Attendance
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              {attendanceData.length}
            </MDTypography>{" "}
            total records
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {recentRecords.map((record, index) => (
          <TimelineItem
            key={record.id || index}
            color={getColor(record.students_present || 0, record.students_absent || 0)}
            icon={getIcon(record.students_present || 0, record.students_absent || 0)}
            title={`${record.students_present || 0} present, ${record.students_absent || 0} absent`}
            dateTime={record.topic_covered || "No topic specified"}
            lastItem={index === recentRecords.length - 1}
          />
        ))}
      </MDBox>
    </Card>
  );
}

// Add PropTypes validation
OrdersOverview.propTypes = {
  attendanceData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      students_present: PropTypes.number,
      students_absent: PropTypes.number,
      topic_covered: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};

OrdersOverview.defaultProps = {
  attendanceData: [],
  loading: false,
};

export default OrdersOverview;
