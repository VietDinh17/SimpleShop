import React from "react";
import { PacmanLoader } from "react-spinners";
import { Box } from "gestalt";

const Mloader = ({ show }) =>
  show && (
    <Box
      position="fixed"
      dangerouslySetInlineStyle={{
        __style: {
          bottom: 50,
          left: "50%",
          // transform: "translateX(-50%)"
        }
      }}
    >
      <PacmanLoader color="orange" size={25} margin="3px" />
    </Box>
  );

export default Mloader;
