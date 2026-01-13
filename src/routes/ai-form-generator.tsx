import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ai-form-generator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ai-form-generator"!</div>
}
