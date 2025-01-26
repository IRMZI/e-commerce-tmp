import "./history.css";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography, Box, Paper } from '@mui/material';
import { FaSpa, FaLeaf, FaGlobe } from 'react-icons/fa';
import { GiMushroom } from 'react-icons/gi';

export default function History() {
  return (
    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', padding: 2, backgroundColor: '#f8f6f6' }}>
      <Typography variant="h4" gutterBottom>Nossa Jornada</Typography>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" aria-label="Spa Icon">
              <FaSpa />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'left' }}>
              <Typography variant="h6" color="primary">2018</Typography>
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
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'right' }}>
              <Typography variant="h6" color="secondary">2020</Typography>
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
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'left' }}>
              <Typography variant="h6" color="success">2021/2022</Typography>
              <Typography>Expandimos nossa clientela no Vale dos Sinos</Typography>
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
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'right' }}>
              <Typography variant="h6" color="error">2023/2024</Typography>
              <Typography>Nos aventuramos no mundo digital</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}
