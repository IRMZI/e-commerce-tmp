import React, { useEffect, useState } from "react";
import leadService from "../../../services/lead";
import { FaTrash, FaFilter, FaSyncAlt } from "react-icons/fa";
import "./leads.css";

export default function LeadsAdmin() {
  const { getLeads, leadsList, leadsLoading, updateLeadStatus, deleteColdLeads } = leadService();
  const [currentPage, setCurrentPage] = useState(0);
  const [leadsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLeadType, setFilterLeadType] = useState("");

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleLeadTypeFilterChange = (e) => {
    setFilterLeadType(e.target.value);
  };

  const handleStatusChange = async (leadId, status) => {
    await updateLeadStatus(leadId, status);
    getLeads();
  };

  const handleDeleteColdLeads = async () => {
    await deleteColdLeads();
    getLeads();
  };

  const filteredLeads = leadsList.filter(lead => 
    (filterStatus === "" || lead.status === filterStatus) &&
    (filterLeadType === "" || lead.leadType === filterLeadType)
  );

  const displayedLeads = filteredLeads.slice(currentPage * leadsPerPage, (currentPage + 1) * leadsPerPage);

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  useEffect(() => {
    getLeads();
  }, []);

  if (leadsLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="leads-container">
      <h2>Leads</h2>
      <div className="filter-container">
        <label htmlFor="statusFilter">
          <FaFilter /> Filtrar por Status:
        </label>
        <select id="statusFilter" value={filterStatus} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="new">Novo</option>
          <option value="contacted">Contactado</option>
          <option value="qualified">Qualificado</option>
          <option value="lost">Perdido</option>
        </select>
        <label htmlFor="leadTypeFilter">
          <FaFilter /> Filtrar por Tipo de Lead:
        </label>
        <select id="leadTypeFilter" value={filterLeadType} onChange={handleLeadTypeFilterChange}>
          <option value="">Todos</option>
          <option value="hot-lead">Lead Quente</option>
          <option value="cold-lead">Lead Frio</option>
        </select>
        <button onClick={handleDeleteColdLeads} className="delete-cold-leads-button">
          <FaTrash /> Limpar Leads Frios
        </button>
      </div>
      <table className="leads-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Tipo de Lead</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {displayedLeads.map(lead => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>{lead.leadType}</td>
              <td>
                <select value={lead.status} onChange={(e) => handleStatusChange(lead._id, e.target.value)}>
                  <option value="new">Novo</option>
                  <option value="contacted">Contactado</option>
                  <option value="qualified">Qualificado</option>
                  <option value="lost">Perdido</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${index === currentPage ? "active" : ""}`}
            onClick={() => handlePageClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
