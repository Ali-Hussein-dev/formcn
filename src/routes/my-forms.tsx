import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-forms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/my-forms"!</div>
}
