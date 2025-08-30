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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card id="payment-info">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Payment Information
        </MDTypography>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>receipt</Icon>
          &nbsp;payment receipt
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox display="flex" alignItems="center" mb={2}>
                <Icon color="info" fontSize="large">
                  account_balance
                </Icon>
                <MDTypography variant="h6" fontWeight="medium" ml={2}>
                  Bank Transfer
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDTypography variant="caption" fontWeight="regular" color="text">
                  Account Name: Partner Facilities Ltd.
                </MDTypography>
                <MDTypography variant="caption" fontWeight="medium" display="block">
                  1234 5678 9012 3456
                </MDTypography>
                <MDTypography variant="caption" fontWeight="regular" color="text" display="block">
                  Bank: Uganda Commercial Bank
                </MDTypography>
                <MDTypography variant="caption" fontWeight="regular" color="text" display="block">
                  Branch: Kampala Main Branch
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox display="flex" alignItems="center" mb={2}>
                <Icon color="success" fontSize="large">
                  local_atm
                </Icon>
                <MDTypography variant="h6" fontWeight="medium" ml={2}>
                  Mobile Money
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDTypography variant="caption" fontWeight="regular" color="text">
                  MTN Mobile Money:
                </MDTypography>
                <MDTypography variant="caption" fontWeight="medium" display="block">
                  0772 123 456
                </MDTypography>
                <MDTypography variant="caption" fontWeight="regular" color="text" display="block">
                  Airtel Money:
                </MDTypography>
                <MDTypography variant="caption" fontWeight="medium" display="block">
                  0752 987 654
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox
              borderRadius="lg"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
                backgroundColor: darkMode ? "transparent" : "grey-100",
              }}
            >
              <MDBox display="flex" alignItems="center" mb={1}>
                <Icon color="warning" fontSize="large">
                  point_of_sale
                </Icon>
                <MDTypography variant="h6" fontWeight="medium" ml={2}>
                  Physical Payment Instructions
                </MDTypography>
              </MDBox>
              <MDTypography variant="caption" fontWeight="regular" color="text">
                For physical payments, please visit our office during business hours:
              </MDTypography>
              <MDTypography variant="caption" fontWeight="medium" display="block">
                Mon - Fri: 8:00 AM - 5:00 PM
              </MDTypography>
              <MDTypography variant="caption" fontWeight="medium" display="block">
                Sat: 9:00 AM - 1:00 PM
              </MDTypography>
              <MDTypography
                variant="caption"
                fontWeight="regular"
                color="text"
                display="block"
                mt={1}
              >
                Address: Plot 45, Kampala Road, Kampala
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
