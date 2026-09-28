import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/praia/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/praia/$id"!</div>
}
