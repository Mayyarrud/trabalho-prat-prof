import { createFileRoute } from "@tanstack/react-router";

import BeachPage from "@/pages/beach";

export const Route = createFileRoute("/praia/$id")({
  component: BeachRoute,
});

function BeachRoute() {
  const { id } = Route.useParams();

  return <BeachPage beachId={id} />;
}
