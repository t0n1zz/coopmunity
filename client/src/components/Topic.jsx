import { PersonAddOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const Topic = ({ name, subtitle }) => {
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <PersonAddOutlined sx={{ color: primaryDark }} />
        <Box onClick={() => {}}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Topic;
