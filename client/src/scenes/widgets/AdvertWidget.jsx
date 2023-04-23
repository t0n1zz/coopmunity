import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Help us growth
        </Typography>
        <Typography color={medium}><a href="https://tr.ee/i1sjz7oXjZ" target="_blank" rel="noopener noreferrer">DONATE</a></Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Help us maintain and keep building this platform so everyone in Cooperatives / Credit Union movement can growth 
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
