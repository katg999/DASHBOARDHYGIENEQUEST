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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";

function Projects({ attendanceData, usersData, loading }) {
  const { columns, rows } = data(attendanceData, usersData);

  if (loading) {
    return (
      <MDBox>
        <MDTypography variant="h6" fontWeight="medium" pt={2} pb={3}>
          Attendance Records
        </MDTypography>
        <MDTypography variant="body2" color="text">
          Loading data...
        </MDTypography>
      </MDBox>
    );
  }

  return (
    <MDBox>
      <MDTypography variant="h6" fontWeight="medium" pt={2} pb={3}>
        Attendance Records
      </MDTypography>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={true}
        noEndBorder
      />
    </MDBox>
  );
}

// Add PropTypes validation
Projects.propTypes = {
  attendanceData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      phone: PropTypes.string,
      students_present: PropTypes.number,
      students_absent: PropTypes.number,
      absence_reason: PropTypes.string,
      topic_covered: PropTypes.string,
    })
  ),
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      phone: PropTypes.string,
      name: PropTypes.string,
      school: PropTypes.string,
      district: PropTypes.string,
      language: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};

Projects.defaultProps = {
  attendanceData: [],
  usersData: [],
  loading: false,
};

export default Projects;
