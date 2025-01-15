import { useState } from "react";

const leadService = () => {
  const [leadsList, setLeadsList] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const url = "http://localhost:3000";

  const createLead = async (leadData) => {
    try {
      const response = await fetch(`${url}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar lead");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getLeads = async () => {
    setLeadsLoading(true);
    try {
      const response = await fetch(`${url}/leads`);
      if (!response.ok) {
        throw new Error("Erro ao buscar leads");
      }
      const result = await response.json();
      setLeadsList(Array.isArray(result.body.body.data) ? result.body.body.data : []);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLeadsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId, status) => {
    try {
      const response = await fetch(`${url}/leads/${leadId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do lead");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteColdLeads = async () => {
    try {
      const response = await fetch(`${url}/leads/cold-leads`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar leads frios");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getLeads, createLead, updateLeadStatus, deleteColdLeads, leadsList, leadsLoading };
};

export default leadService;
