import LeadsDataAccess from "../DataAccess/leads.js";
import { ok, serverError } from "../helpers/httpResponse.js"; // Supondo que há um helper para respostas HTTP
import { ESTADOS_BRASIL } from "../helpers/constants.js";
import { sendEmail } from "../services/mailservice.js";
import fs from "fs";

export default class LeadsController {
  constructor() {
    this.dataAccess = new LeadsDataAccess(); // Instancia a classe de acesso aos dados de leads
  }

  // Método para criar um lead
  async createLead(leadData) {
    try {
      const { name, email, state } = leadData;

      // Validação dos campos obrigatórios
      if (!name || !email || !state) {
        return error("Nome, email e estado são obrigatórios");
      }

      // Validação do estado
      if (!ESTADOS_BRASIL.includes(state)) {
        return error("Estado inválido");
      }
      // Caminho do arquivo PDF
      const pdfPath = "./src/Data/ebook.pdf";
      // Enviar o e-mail
      const emailContent = `
      <h1>🎉 Obrigado por se cadastrar, ${name}! 🎉</h1>
      <p>Estamos empolgados em ter você conosco na comunidade dos apaixonados por cogumelos!</p>
      <p>Como prometido, enviamos para você um presente especial: o nosso exclusivo <strong>E-book de Receitas com Cogumelos</strong>. Confira o anexo deste e-mail para acessar o material.</p>
      <p>Nele, você encontrará receitas incríveis que vão transformar seus pratos e surpreender a todos!</p>
      <p><strong>Explore, experimente e aproveite!</strong></p>
      <p>Se precisar de qualquer ajuda ou tiver dúvidas, estamos aqui para ajudar. Boas receitas! 🍄</p>
      `;
      await sendEmail(email, "Seu E-book Exclusivo!", emailContent, pdfPath);

      const result = await this.dataAccess.createLead({ name, email, state });
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }

  // Método para obter todos os leads
  async getLeads() {
    try {
      const leads = await this.dataAccess.getLeads();
      return ok(leads);
    } catch (error) {
      return serverError(error);
    }
  }
}
