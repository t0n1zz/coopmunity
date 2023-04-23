import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import Topic from "components/Topic";

const TopicListWidget = () => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Topic List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <Topic
          name={`Finance Service`}
          subtitle={`Credit union financial service`}
        />
        <Topic
          name={`Education`}
          subtitle={`Education model for members`}
        />
        <Topic
          name={`Technology`}
          subtitle={`Tech stack for core banking`}
        />
      </Box>
    </WidgetWrapper>
  );
};

export default TopicListWidget;
