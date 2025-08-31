// src/layouts/tables/data/authorsTableData.js
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Function to transform API data to table format
export const transformAttendanceData = (apiData) => {
  return apiData.map((item) => ({
    school: (
      <MDTypography variant="caption" fontWeight="medium">
        {item.school}
      </MDTypography>
    ),
    district: (
      <MDTypography variant="caption" fontWeight="medium">
        {item.district}
      </MDTypography>
    ),
    topic: (
      <MDTypography variant="caption" fontWeight="medium">
        {item.topic_covered}
      </MDTypography>
    ),
    teacher: (
      <MDTypography variant="caption" fontWeight="medium">
        {item.teacher_name}
      </MDTypography>
    ),
    present: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={item.students_present}
          color="success"
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    absent: (
      <MDBox ml={-1}>
        <MDBadge badgeContent={item.students_absent} color="error" variant="gradient" size="sm" />
      </MDBox>
    ),
    reason: (
      <MDTypography variant="caption" fontWeight="medium">
        {item.absence_reason}
      </MDTypography>
    ),
  }));
};

export default function data(apiData = []) {
  const transformedData = transformAttendanceData(apiData);

  return {
    columns: [
      { Header: "School", accessor: "school", width: "15%", align: "left" },
      { Header: "District", accessor: "district", width: "15%", align: "left" },
      { Header: "Topic Covered", accessor: "topic", width: "20%", align: "left" },
      { Header: "Teacher", accessor: "teacher", width: "15%", align: "left" },
      { Header: "Present", accessor: "present", width: "10%", align: "center" },
      { Header: "Absent", accessor: "absent", width: "10%", align: "center" },
      { Header: "Absence Reason", accessor: "reason", width: "15%", align: "left" },
    ],

    rows:
      transformedData.length > 0
        ? transformedData
        : [
            {
              school: <MDTypography variant="caption">No data available</MDTypography>,
              district: <MDTypography variant="caption">-</MDTypography>,
              topic: <MDTypography variant="caption">-</MDTypography>,
              teacher: <MDTypography variant="caption">-</MDTypography>,
              present: <MDTypography variant="caption">-</MDTypography>,
              absent: <MDTypography variant="caption">-</MDTypography>,
              reason: <MDTypography variant="caption">-</MDTypography>,
            },
          ],
  };
}
