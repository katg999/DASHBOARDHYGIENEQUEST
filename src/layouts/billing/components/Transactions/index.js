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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import OrderActivity from "layouts/billing/components/Transaction";

function OrderActivities() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Recent Order Activities
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2023
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            today
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <OrderActivity
            color="success"
            icon="local_shipping"
            facility="Nyakasura Primary School"
            description="25 cartons of Dettol Harpic Soap"
            status="Delivered"
          />
          <OrderActivity
            color="warning"
            icon="inventory"
            facility="Hoima Primary School"
            description="10 cartons of Dettol Original Soap"
            status="Processing"
          />
        </MDBox>
        <MDBox mt={1} mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            yesterday
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <OrderActivity
            color="info"
            icon="add_shopping_cart"
            facility="Wakiso Primary School"
            description="15 cartons of Dettol Handwash"
            status="New Order"
          />
          <OrderActivity
            color="warning"
            icon="inventory"
            facility="Kampala Parents School"
            description="30 cartons of Dettol Liquid Soap"
            status="Processing"
          />
          <OrderActivity
            color="success"
            icon="local_shipping"
            facility="Gayaza High School"
            description="20 cartons of Dettol Multipurpose Cleaner"
            status="Delivered"
          />
          <OrderActivity
            color="error"
            icon="warning"
            facility="Kibuli Secondary School"
            description="5 cartons of Dettol Antiseptic"
            status="On Hold"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default OrderActivities;
