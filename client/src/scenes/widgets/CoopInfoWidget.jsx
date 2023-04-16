import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const CoopInfoWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          What is Cooperatives (Coop) / Credit Union?
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      A credit union is a customer/member owned financial cooperative, democratically controlled by its members, and operated for the purpose of maximizing the economic benefit of its members by providing financial services at competitive and fair rates.
      </Typography>
      <FlexBetween>
        <Typography color={main}>Find more at</Typography>
        <Typography color={medium}>woccu.org</Typography>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default CoopInfoWidget;
