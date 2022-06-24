import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import Index from "./pages/Index";
import Invoice from "./pages/Invoice";
import InvoiceById from "./pages/InvoiceById";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="invoice">
          <Route path="" element={<Invoice />} />
          <Route path=":id" element={<InvoiceById />} />
        </Route>
      </Routes>
    </Container>
  );
}

function Invoices() {
  return <p>Invoices</p>;
}

export default App;
