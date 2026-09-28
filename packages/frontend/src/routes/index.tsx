import { createFileRoute } from "@tanstack/react-router";
import ExemploPage from "@/pages/exemplo";

export const Route = createFileRoute("/")({
  component: ExemploPage,
});