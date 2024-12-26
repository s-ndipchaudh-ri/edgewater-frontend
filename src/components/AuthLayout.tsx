import React, { useState } from "react";
import { Grid, Card, CardContent, Tabs, Tab, Typography, Box } from "@mui/material";
import Login from "./Login"; // Import the Login component
import Register from "./Register"; // Import the Register component

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage the active tab (Login/Register)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Login/Register Section (30%) */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card sx={{ width: "80%", padding: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{ marginBottom: "16px" }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            <CardContent>
              {activeTab === 0 && (
                <>
                  <Typography variant="h6" align="center" gutterBottom>
                    Login
                  </Typography>
                  <Login /> {/* Render the Login form */}
                </>
              )}
              {activeTab === 1 && (
                <>
                  <Typography variant="h6" align="center" gutterBottom>
                    Register
                  </Typography>
                  <Register /> {/* Render the Register form */}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Extra Data Section (70%) */}
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            backgroundColor: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "80%" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Extra Data Section
            </Typography>
            <Typography variant="body1" align="center">
              This section can include any extra data, images, or other content.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
