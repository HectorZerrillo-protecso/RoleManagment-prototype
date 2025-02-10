"use client"

import { useState, useEffect } from "react"
import { ActiveRoles } from "./ActiveRoles"
import { useRouter } from "next/navigation"

export default function RoleManagement() {
  const [roles, setRoles] = useState([])
  const router = useRouter()

  useEffect(() => {
    const storedRoles = localStorage.getItem("roles")
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles))
    }
  }, [])

  const handleCreateRole = () => {
    router.push("/roles/new")
  }

  const handleEditRole = (role) => {
    router.push(`/roles/${role.id}/edit`)
  }

  const handleDeleteRole = (role) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este rol?")
    if (confirmed) {
      const updatedRoles = roles.filter((r) => r.id !== role.id)
      setRoles(updatedRoles)
      localStorage.setItem("roles", JSON.stringify(updatedRoles))
    }
  }

  return (
    <ActiveRoles 
      roles={roles} 
      onEditRole={handleEditRole} 
      onDeleteRole={handleDeleteRole} 
      onCreateRole={handleCreateRole} 
    />
  )
}