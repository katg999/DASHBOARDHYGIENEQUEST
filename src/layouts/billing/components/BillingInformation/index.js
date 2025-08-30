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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Partner Facilities Orders
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="Nyakasura Primary School"
            facilityName="Viking Burrito"
            phoneNumber="0772207616"
            orderDetails="25 cartons of Dettol Harpic Soap"
          />
          <Bill
            name="Hoima Primary School"
            facilityName="Stone Tech Zone"
            phoneNumber="0774567890"
            orderDetails="10 cartons of Dettol Original Soap"
          />
          <Bill
            name="Wakiso Primary School"
            facilityName="Fiber Notion"
            phoneNumber="0779876543"
            orderDetails="15 cartons of Dettol Handwash"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
