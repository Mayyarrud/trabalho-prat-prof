import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/index";

export const Route = createFileRoute("/")({
  component: HomePage,
});
