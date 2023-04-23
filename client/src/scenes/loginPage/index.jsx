import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import BetaNoticeWidget from "scenes/widgets/BetaNoticeWidget";
import CoopInfoWidget from "scenes/widgets/CoopInfoWidget";

const LoginPage = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box sx={{ pb: "1rem" }} >
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Coopmunity
        </Typography>
      </Box>

      <Box
        width="98%"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <BetaNoticeWidget />
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <CoopInfoWidget />
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          To access the content here then you need to login
        </Typography>
        <Form />
      </Box>

      <Typography color={medium} fontSize="0.75rem" textAlign="center">
        Developed by <a href="https://linktr.ee/laurensiustony" target="_blank" rel="noopener noreferrer">PamanBeruang</a>
      </Typography>
    </Box>
  );
};

export default LoginPage;
