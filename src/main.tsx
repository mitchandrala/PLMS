import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { SlotProvider } from "./Context/slotContext.tsx";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <BrowserRouter>
      <SlotProvider>
        <App />
      </SlotProvider>
    </BrowserRouter>
  </MantineProvider>,
);
