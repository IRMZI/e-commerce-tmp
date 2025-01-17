import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import "./terms.css";

export default function Terms() {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>Termos de Uso</Typography>
        <Typography variant="body1" paragraph>
          Bem-vindo ao nosso site. Ao utilizar este site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso, que, junto com nossa Política de Privacidade, regem o relacionamento entre Sítio Campestre e você. Caso não concorde com qualquer parte destes termos, pedimos que não utilize o site.
        </Typography>
        <Typography variant="h5" gutterBottom>1. Uso do Site</Typography>
        <Typography variant="body1" paragraph>
          O conteúdo deste site é fornecido apenas para sua informação geral e uso pessoal. Ele pode ser alterado a qualquer momento sem aviso prévio. O uso do site é por sua conta e risco, sendo sua responsabilidade garantir que quaisquer produtos, serviços ou informações atendam às suas necessidades.
        </Typography>
        <Typography variant="h5" gutterBottom>2. Privacidade e Proteção de Dados</Typography>
        <Typography variant="body1" paragraph>
          Estamos comprometidos com a proteção dos seus dados pessoais, conforme estabelecido pela Lei Geral de Proteção de Dados (LGPD). As informações coletadas por meio do site serão utilizadas estritamente para os fins descritos na nossa Política de Privacidade. Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento.
        </Typography>
        <Typography variant="h5" gutterBottom>3. Propriedade Intelectual</Typography>
        <Typography variant="body1" paragraph>
          Todos os materiais presentes neste site, incluindo design, layout, gráficos, textos e logotipos, são de propriedade exclusiva do Sítio Campestre ou licenciados para uso. É estritamente proibida a reprodução, distribuição ou qualquer outro uso sem autorização prévia por escrito, exceto conforme permitido pela legislação de direitos autorais.
        </Typography>
        <Typography variant="h5" gutterBottom>4. Limitação de Responsabilidade</Typography>
        <Typography variant="body1" paragraph>
          Não garantimos a precisão, integridade ou atualidade das informações fornecidas no site. Não somos responsáveis por quaisquer danos diretos, indiretos ou consequenciais resultantes do uso ou incapacidade de uso do site, incluindo, mas não se limitando a, perdas financeiras ou de dados.
        </Typography>
        <Typography variant="h5" gutterBottom>5. Links para Outros Sites</Typography>
        <Typography variant="body1" paragraph>
          Este site pode conter links para sites externos que não estão sob nosso controle. Não assumimos responsabilidade pelo conteúdo ou políticas de privacidade desses sites. A inclusão de links não implica endosso ou associação com tais sites.
        </Typography>
        <Typography variant="h5" gutterBottom>6. Alterações nos Termos</Typography>
        <Typography variant="body1" paragraph>
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site. Recomendamos que revise os termos periodicamente para estar ciente de quaisquer atualizações.
        </Typography>
        <Typography variant="h5" gutterBottom>7. Jurisdição e Lei Aplicável</Typography>
        <Typography variant="body1" paragraph>
          Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada a estes termos será resolvida exclusivamente nos tribunais do Brasil, na comarca de nossa sede.
        </Typography>
        <Typography variant="h5" gutterBottom>8. Aceitação dos Termos</Typography>
        <Typography variant="body1" paragraph>
          Ao utilizar este site, você reconhece que leu, compreendeu e concorda com os Termos de Uso e nossa Política de Privacidade.
        </Typography>
        <Typography variant="h5" gutterBottom>9. Contato</Typography>
        <Typography variant="body1" paragraph>
          Se você tiver dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco por meio do e-mail contato@sitiocampestre.com.br.
        </Typography>
      </Paper>
    </Box>
  );
}
