/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

export default function data(attendanceData = [], usersData = []) {
  // Combine data based on phone number
  const combinedData = attendanceData.map((att) => {
    const user = usersData.find((u) => u.phone === att.phone);
    return user ? { ...att, ...user } : att;
  });

  // Calculate attendance rate for each record
  const dataWithRates = combinedData.map((item) => {
    const present = item.students_present || 0;
    const absent = item.students_absent || 0;
    const total = present + absent;
    const rate = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { ...item, attendance_rate: rate };
  });

  const School = ({ name, district }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name || "Unknown School"}
      </MDTypography>
      <MDTypography variant="caption" color="text" ml={0.5}>
        ({district || "Unknown District"})
      </MDTypography>
    </MDBox>
  );

  const AttendanceProgress = ({ value }) => (
    <MDBox width="8rem" textAlign="left">
      <MDProgress
        value={value}
        color={value >= 70 ? "success" : value >= 50 ? "warning" : "error"}
        variant="gradient"
        label={false}
      />
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
    </MDBox>
  );

  const Reason = ({ reason }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {reason && reason.length > 20 ? `${reason.substring(0, 20)}...` : reason || "No reason"}
    </MDTypography>
  );

  return {
    columns: [
      { Header: "school", accessor: "school", width: "25%", align: "left" },
      { Header: "present", accessor: "students_present", align: "center" },
      { Header: "absent", accessor: "students_absent", align: "center" },
      { Header: "attendance", accessor: "attendance_rate", align: "center" },
      { Header: "reason", accessor: "absence_reason", align: "left" },
      { Header: "topic", accessor: "topic_covered", align: "left" },
    ],

    rows: dataWithRates.map((item) => ({
      school: <School name={item.school} district={item.district} />,
      students_present: (
        <MDTypography variant="caption" color="success" fontWeight="medium">
          {item.students_present || 0}
        </MDTypography>
      ),
      students_absent: (
        <MDTypography variant="caption" color="error" fontWeight="medium">
          {item.students_absent || 0}
        </MDTypography>
      ),
      attendance_rate: <AttendanceProgress value={item.attendance_rate} />,
      absence_reason: <Reason reason={item.absence_reason} />,
      topic_covered: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.topic_covered || "No topic"}
        </MDTypography>
      ),
    })),
  };
}
