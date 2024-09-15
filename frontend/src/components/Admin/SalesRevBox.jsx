import * as React from "react";
import "../../styles/admin.css";
import FlexBetween from "../Admin/FlexBetween";
import {
  TrendingUp,
  AttachMoneyRounded,
  Inventory2Outlined,
} from "@mui/icons-material";

export default function AlignItemsList() {
  return (
    <div className="sales_status">
      <h5>SALES STATUS</h5>
      <FlexBetween>
        <div className="sales_revenue_1">
          <h6>Number of Sales</h6>
          <h3>3</h3>
        </div>
        <TrendingUp sx={{ fontSize: "37px" }} />
      </FlexBetween>
      <FlexBetween>
        <div className="sales_revenue_2">
          <h6>Sales Revanue</h6>
          <h3>Rs.16,520</h3>
        </div>
        <AttachMoneyRounded sx={{ fontSize: "37px" }} />
      </FlexBetween>
      <FlexBetween>
        <div className="sales_revenue_3">
          <h6>Product Sold</h6>
          <h3>14</h3>
        </div>
        <Inventory2Outlined sx={{ fontSize: "35px" }} />
      </FlexBetween>
    </div>
  );
}
