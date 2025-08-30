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
import MDButton from "components/MDButton";

// Billing page components
import Order from "layouts/billing/components/Invoice";

function Orders() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Recent Orders
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          view all
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Order
            orderId="ORD-415646"
            date="March, 01, 2025"
            status="Delivered"
            items="25 cartons of Dettol Harpic Soap"
          />
          <Order
            orderId="ORD-126749"
            date="February, 10, 2024"
            status="Processing"
            items="10 cartons of Dettol Original Soap"
          />
          <Order
            orderId="ORD-103578"
            date="April, 05, 2025"
            status="Delivered"
            items="15 cartons of Dettol Handwash"
          />
          <Order
            orderId="ORD-803481"
            date="June, 25, 2023"
            status="Delivered"
            items="30 cartons of Dettol Liquid Soap"
          />
          <Order
            orderId="ORD-562341"
            date="March, 01, 2023"
            status="Delivered"
            items="20 cartons of Dettol Multipurpose Cleaner"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Orders;
