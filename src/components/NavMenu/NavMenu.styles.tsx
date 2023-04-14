import type { ReactComponents } from "../../types/React"

export function NavLink({ title, url }: { title: string; url: string }) {
  return (
    <a className="block py-4 font-poppins text-2xl font-light" href={url}>
      {title}
    </a>
  )
}

export function NavLinkContainer({ children }: ReactComponents) {
  return <div className="mt-6">{children}</div>
}
