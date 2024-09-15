import React from "react";
import FlexBetween from "../components/Admin/FlexBetween";
import StatBox from "../components/Admin/StatBox";
import SalesRevBox from "../components/Admin/SalesRevBox";
import Header from "../components/Admin/Header";
import { grey } from "@mui/material/colors";
import {
  Box,
  Button,
} from "@mui/material";
import {
  DownloadOutlined,
  ShoppingCart,
  PeopleAlt,
  Store,
} from "@mui/icons-material";
import {blue, blueGrey} from "@mui/material/colors";

export const Dashboard = () => {
  return (
    <Box>
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: blueGrey,
              color: blue,
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "8px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        {/* BOX 1 */}
        <StatBox
          title="Number of Sellers"
          value="1"
          icon={<Store sx={{ color: grey[400], fontSize: "37px" }} />}
        />
        {/* BOX 2 */}
        <StatBox
          title="Number of Customers"
          value="9"
          icon={<PeopleAlt sx={{ color: grey[400], fontSize: "37px" }} />}
        />
        {/* BOX 3 */}
        <StatBox
          title="Number of Orders"
          value="4"
          icon={<ShoppingCart sx={{ color: grey[400], fontSize: "37px" }} />}
        />
      </Box>
      <Box
        mt="20px"
        display="flex"
        gridAutoRows="160px"
        gap="20px"
      ><SalesRevBox/>
      </Box>
    </Box>
  );
};
