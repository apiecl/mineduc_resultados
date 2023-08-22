import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./AppLayout";
import Home from "./Home";
import Content from "./Content";
import Caracterizacion from "./Caracterizacion";
import Resultados from "./Resultados";
import ErrorPage from "./ErrorPage";
import "./scss/index.scss";
import { ThemeProvider } from "./ThemeContext";
import { ContentProvider } from "./ContentContext";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "test",
        Component: Content,
        loader: () => {
          return "Test";
        },
      },
      {
        path: "informacion-por-estamentos",
        Component: Content,
        loader: () => {
          return "Info";
        },
      },
      {
        path: "caracterizacion-establecimientos",
        Component: Caracterizacion,
      },
      {
        path: "nivel-medio-mayor-nivel-transicion-primero-y-segundo-basico",
        Component: Resultados,
      },
      {
        path: "3ro-a-6to-basico",
        Component: Resultados,
      },
      {
        path: "7mo-basico-a-ii-medio",
        Component: Resultados,
      },
      {
        path: "iii-iv-medio-y-nivel-laboral-educacion-especial",
        Component: Resultados,
      },
      {
        path: "directivos-y-docentes",
        Component: Resultados,
      },
      {
        path: "asistentes-de-la-educacion-profesionales-de-convivencia-escolar-y-pie",
        Component: Resultados,
      },
      {
        path: "educadores-as-de-parvulos-tecnicos-as-en-parvulos-equipo-pedagogico-educacion-especial",
        Component: Resultados,
      },
      {
        path: "madres-padres-y-apoderados",
        Component: Resultados,
      },
    ],
  },
  {
    path: "404",
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
