import { Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddGenre = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const isNonMobile = useMediaQuery("(min-width:600px)");


  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/genre`, {
        title: title,
      });
      //   console.log(response.data.data);
      navigate("/genre");
      toast.success(response?.data?.message);

      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE" subtitle="Genre" />
      {isLoading && <p className="form-loading">Loading...</p>}

      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Title"
          required={true}
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={isLoading}
          onClick={handleFormSubmit}
        >
          CREATE
        </Button>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
});
const initialValues = {
  title: "",
};

export default AddGenre;
