import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const BetaNoticeWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          NOTICE: This is BETA Application
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      What it's mean for BETA Application? it mean that this application still in development and user/you will expect some issue or error along the way.
      </Typography>
    </WidgetWrapper>
  );
};

export default BetaNoticeWidget;
