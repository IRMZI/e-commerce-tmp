import "./history.css";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Typography, Box, Paper, Button, Grid } from "@mui/material";
import {
  FaSpa,
  FaLeaf,
  FaGlobe,
  FaQuestionCircle,
  FaSeedling,
} from "react-icons/fa";
import { GiMushroom } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function History() {
  return (
    <>
      <Box
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
          padding: 2,
          backgroundColor: "#f8f6f6",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Nossa Jornada
        </Typography>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" aria-label="Spa Icon">
                <FaSpa />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ padding: 2, textAlign: "left" }}>
                <Typography variant="h6" color="primary">
                  2018
                </Typography>
                <Typography>Adquirimos a nossa bela propriedade</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" aria-label="Mushroom Icon">
                <GiMushroom />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ padding: 2, textAlign: "right" }}>
                <Typography variant="h6" color="secondary">
                  2020
                </Typography>
                <Typography>Iniciamos nossa jornada de produção</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success" aria-label="Leaf Icon">
                <FaLeaf />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ padding: 2, textAlign: "left" }}>
                <Typography variant="h6" color="success">
                  2021/2022
                </Typography>
                <Typography>
                  Expandimos nossa clientela no Vale dos Sinos
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="error" aria-label="Globe Icon">
                <FaGlobe />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ padding: 2, textAlign: "right" }}>
                <Typography variant="h6" color="error">
                  2023/2024
                </Typography>
                <Typography>Nos aventuramos no mundo digital</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item>
          <Button
            component={Link}
            to="/why-mushrooms"
            variant="contained"
            sx={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#e9db1b",
              color: "#333",
            }}
            startIcon={<FaQuestionCircle />}
          >
            Por que Cogumelos?
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/sustainableCulture"
            variant="contained"
            sx={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "var(--primary-color)",
            }}
            startIcon={<FaSeedling />}
          >
            Cultura Sustentável
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
