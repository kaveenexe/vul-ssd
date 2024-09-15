import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { blue, grey } from "@mui/material/colors";

const StatBox = ({ title, value, icon }) => {
  return (
    <Box
      gridColumn="span 4"
      gridRow="span 0"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1rem 1rem"
      flex="1 1 100%"
      borderRadius="0.55rem"
      backgroundColor={blue[900]}
    >
      <FlexBetween>
        <Typography fontSize="16px" fontWeight="300" sx={{ color: grey[400] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography fontSize="35px" fontWeight="600" sx={{ color: grey[400] }}>
        {value}
      </Typography>
    </Box>
  );
};

export default StatBox;
