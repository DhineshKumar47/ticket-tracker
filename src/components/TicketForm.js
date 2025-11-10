import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const API_URL = "https://ticket-tracker-backend.vercel.app/api/tickets";

export default function TicketForm({ refresh }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "low" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ title: "", description: "", priority: "low" });
    refresh();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: "flex", gap: 2 }}>
      <TextField
        label="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        fullWidth
      />
      <TextField
        label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        fullWidth
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={form.priority}
          label="Priority"
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
}
