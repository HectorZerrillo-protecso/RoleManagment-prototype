import { RoleForm } from "../../../components/RoleForm"

export default function NewRole() {
  return (
    <div className="container mx-auto p-4 bg-[#FAFAFA]">
      <h1 className="text-2xl font-bold mb-4 text-black">Crear Nuevo Rol</h1>
      <RoleForm role={{ id: "", name: "", permissions: [] }} />
    </div>
  )
}

