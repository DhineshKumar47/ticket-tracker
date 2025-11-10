import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";

const API_URL = "https://ticket-tracker-backend.vercel.app/api/tickets";

export default function TicketList({ tickets, refresh, applyFilter }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({ status: "", priority: "" });

  const updateStatus = async (id, status) => {
    await axios.patch(`${API_URL}/${id}`, { status });
    refresh();
  };

  const deleteTicket = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    refresh();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    applyFilter(filters);
    handleClose();
  };

  return (
    <Paper sx={{ mt: 4, p: 2, backgroundColor: "oldlace" }}>
      <Grid container justifyContent="flex-end" sx={{ mb: 1 }}>
        <IconButton color="primary" onClick={handleOpen}>
          <FilterListAltIcon />
        </IconButton>
      </Grid>

      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Tickets</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={filters.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((t) => (
            <TableRow key={t._id}>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.priority}</TableCell>
              <TableCell>
                <Select
                  value={t.status}
                  size="small"
                  onChange={(e) => updateStatus(t._id, e.target.value)}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in progress">In Progress</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => deleteTicket(t._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
