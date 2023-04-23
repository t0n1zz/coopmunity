import { Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      {image ? (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`${process.env.REACT_APP_EXPRESS_URL}/assets/${image}`}
        />
      ) : (
        <AccountCircle style={{ fontSize: size }}/>
      )}
    </Box>
  );
};

export default UserImage;
