import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import TicketList from "./components/TicketList";
import TicketForm from "./components/TicketForm";

const API_URL = "https://ticket-tracker-backend.vercel.app/api/tickets"; // change when deployed

function App() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async (filters = {}) => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;

    try {
      const res = await axios.get(API_URL, { params });
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        🎫 Ticket Tracker
      </Typography>

      <TicketForm refresh={fetchTickets} />

      <TicketList
        tickets={tickets}
        refresh={() => fetchTickets()}
        applyFilter={(filters) => fetchTickets(filters)}
      />
    </Container>
  );
}

export default App;
