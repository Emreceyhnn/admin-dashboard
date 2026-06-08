import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

/* ─── Login Page ─── */
const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await api.post("/user/login", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F7F8FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 0 },
      }}
    >
      {/* Top Left Header Logo */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 32, md: 40 },
          left: { xs: 24, md: 64 },
          display: "flex",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{ height: 40, objectFit: "contain" }}
        />
        <Typography
          sx={{
            ml: 1.5,
            fontSize: 20,
            fontWeight: 700,
            color: "#1D1E21",
            letterSpacing: "-0.02em",
          }}
        >
          E-Pharmacy
        </Typography>
      </Box>

      {/* Bottom-right decorative shapes */}
      <Box
        component="img"
        src="/elements.png"
        alt="Elements"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          pointerEvents: "none",
          zIndex: 0,
          maxWidth: { xs: "80%", md: "100%" },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          alignItems: { xs: "flex-start", lg: "center" },
          justifyContent: "space-between",
          zIndex: 1,
          gap: { xs: 6, lg: 4 },
        }}
      >
        {/* Left Column: Typography */}
        <Box sx={{ flex: 1, maxWidth: { xs: "100%", lg: 540 }, width: "100%" }}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src="/white round pill.png"
              alt="White round pill"
              sx={{
                position: "absolute",
                top: -60,
                right: -10,
                width: 140,
                pointerEvents: "none",
                zIndex: 0,
                filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.1))",
              }}
            />

            <Typography
              variant="h2"
              component="h1"
              sx={{
                position: "relative",
                zIndex: 1,
                fontSize: { xs: 32, md: 54 },
                fontWeight: 600,
                color: "#1D1E21",
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
              }}
            >
              Your medication,
              <br />
              delivered Say goodbye
              <br />
              to all{" "}
              <Box component="span" sx={{ color: "#59B17A" }}>
                your healthcare
              </Box>{" "}
              <br />
              worries with us
            </Typography>
          </Box>
        </Box>

        {/* Right Column: Form */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 400 },
            mt: { xs: 4, lg: 0 },
          }}
        >
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
              {errorMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              id="login-email"
              placeholder="Email address"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              inputProps={{ "aria-label": "Email address" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  borderRadius: "60px",
                  backgroundColor: "#fff",
                  "& fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "2px solid #59B17A" },
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.02)",
                },
                "& input": {
                  padding: "0 24px",
                  fontSize: 14,
                  "&::placeholder": { color: "#9CA3AF", opacity: 1 },
                },
              }}
            />
            <TextField
              id="login-password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              inputProps={{ "aria-label": "Password" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  borderRadius: "60px",
                  backgroundColor: "#fff",
                  "& fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "2px solid #59B17A" },
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.02)",
                },
                "& input": {
                  padding: "0 24px",
                  fontSize: 14,
                  "&::placeholder": { color: "#9CA3AF", opacity: 1 },
                },
              }}
            />
            <Button
              id="login-submit"
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 1,
                height: 48,
                borderRadius: "60px",
                fontSize: 14,
                fontWeight: 600,
                backgroundColor: "#59B17A",
                boxShadow: "none",
                textTransform: "none",
                "&:hover": { backgroundColor: "#4a9566", boxShadow: "none" },
              }}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
