import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { login } from "../redux/user.reducer";

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("social_auth_type", "normal");

      const response = await axios.post(
        "https://sandbox.practical.me/api/login",
        formData,
        {
            headers: { "Content-Type": "multipart/form-data"}
        }
      );
      if (response.data.isSuccess === true && response.status === 200) {
        NotificationManager.success(response.data.message);
        dispatch(login(response.data.data.auth_token));
      } else {
        NotificationManager.error(response.data.message);
      }
    },
  });

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "1rem"}}
      onSubmit={formik.handleSubmit}
    >
      <TextField
      style={{ marginBottom: "0.5rem" }}
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        label="Email"
        variant="outlined"
      />
      <TextField
      style={{ marginBottom: "1rem" }}
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        label="Password"
        type="password"
        variant="outlined"
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

export default Login;
