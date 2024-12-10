const leadService = () => {
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

  return { createLead };
};

export default leadService;
