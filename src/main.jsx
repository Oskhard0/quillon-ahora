import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import ExperienceRouter from "./navigation/ExperienceRouter";

createRoot(document.getElementById("root")).render(

    <StrictMode>

        <ExperienceRouter />

    </StrictMode>

);