import Logo from "../assets/images/logo.png";
import LandingBanner from "../assets/images/landing-banner.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonShowPassword from "../components/ButtonShowPassword";
import Button from "@mui/material/Button";
import "./landing.scss";

export default function Landing() {
  const { login } = useAppContext();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    login();
    navigate("/users");
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <img src={Logo} className="site-logo" />
      <Container disableGutters={true} className="container">
        <div className="landing-item">
          <img src={LandingBanner} className="landing-banner" />
        </div>

        <div className="landing-item">
          <div className="login-container">
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                placeholder="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={loginDetails.email}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="password"
                  value={loginDetails.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonShowPassword handleClick={handleClickShowPassword}>
                        {showPassword ? "HIDE" : "SHOW"}
                      </ButtonShowPassword>
                    </InputAdornment>
                  }
                />
                {/* <FormHelperText>
                  Password should be at least 8 characters
                </FormHelperText> */}
              </FormControl>

              <Button href="#" className="forgot-password">
                Forgot password?
              </Button>
              <Button type="submit" variant="contained">
                Log in
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
