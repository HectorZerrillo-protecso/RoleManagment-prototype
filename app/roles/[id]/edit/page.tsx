"use client"

import { useParams } from "next/navigation"
import { RoleForm } from "../../../../components/RoleForm"
import { useEffect, useState } from "react"

export default function EditRole() {
  const { id } = useParams()
  const [role, setRole] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]")
    const foundRole = storedRoles.find((r: any) => r.id.toString() === id)
    if (foundRole) {
      setRole(foundRole)
    }
  }, [id])

  if (!role) {
    return <div className="container mx-auto p-4 bg-[#FAFAFA]">Cargando...</div>
  }

  return (
    <div className="container mx-auto p-4 bg-[#FAFAFA]">
      <h1 className="text-2xl font-bold mb-4 text-black">Editar Rol: {role.name}</h1>
      <RoleForm role={role} />
    </div>
  )
}

