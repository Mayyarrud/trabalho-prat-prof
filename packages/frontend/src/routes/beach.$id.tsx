import { createFileRoute } from "@tanstack/react-router";
import BeachPage from "@/pages/beach";

export const Route = createFileRoute("/beach/$id")({
  component: BeachPage,
});
