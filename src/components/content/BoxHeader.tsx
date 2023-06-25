import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween.js";

type Props = {
  title: string;
  sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween className="text-black" margin="1.5rem 1rem 0 1rem">
      
        {icon}
        <Box width="100%">
          <Typography  variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      <Typography >
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;