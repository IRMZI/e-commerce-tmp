import "./history.css";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography, Box, Paper } from '@mui/material';
import { FaSpa, FaLeaf, FaGlobe } from 'react-icons/fa';
import { GiMushroom } from 'react-icons/gi';

export default function History() {
  return (
    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Nossa Jornada</Typography>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
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
            <TimelineDot color="secondary">
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
            <TimelineDot color="success">
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
            <TimelineDot color="error">
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
      <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Sítio Campestre
        </Typography>
        <Typography variant="body1" paragraph>
          O <strong>Sítio Campestre</strong> é uma unidade de produção da Agricultura Familiar, localizada na zona rural de São Sebastião do Caí. Produzimos cogumelos culinários de alta qualidade com técnicas cuidadosas que garantem sabor e frescor.
        </Typography>
        <Typography variant="body1" paragraph>
          Nossa produção é sustentável e artesanal, unindo tradição e inovação. Vendemos diretamente aos consumidores, garantindo frescura e sabor.
        </Typography>
        <Typography variant="body1" paragraph>
          Atendemos clientes em várias cidades da região, incluindo Porto Alegre, Canoas, São Leopoldo e Novo Hamburgo. Nosso compromisso é com a qualidade e a satisfação dos clientes.
        </Typography>
        <Typography variant="body1" paragraph>
          Acreditamos no valor da agricultura familiar e no impacto positivo nas comunidades locais. Cada etapa do nosso processo respeita a natureza e oferece alimentos saudáveis e saborosos.
        </Typography>
        <Typography variant="body1" paragraph>
          Venha descobrir o sabor dos nossos cogumelos e apoiar a agricultura familiar!
        </Typography>
      </Box>
    </Box>
  );
}
