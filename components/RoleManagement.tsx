"use client"

import { useState, useEffect } from "react"
import { RoleList } from "./RoleList"
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

  return (
    <>
      <RoleList roles={roles} onEditRole={handleEditRole} onCreateRole={handleCreateRole} />
      <ActiveRoles roles={roles} />
    </>
  )
}

