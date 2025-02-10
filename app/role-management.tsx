"use client"

import { useState, useEffect } from "react"
import { RoleList } from "./components/RoleList"
import { RoleForm } from "./components/RoleForm"
import { ActiveRules } from "./components/ActiveRules"

export default function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const storedRoles = localStorage.getItem("roles")
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles))
    }
  }, [])

  const handleCreateRole = () => {
    setSelectedRole({ id: Date.now(), name: "", permissions: [] })
  }

  const handleEditRole = (role) => {
    setSelectedRole(role)
  }

  const handleSaveRole = (role) => {
    let updatedRoles
    if (role.id) {
      updatedRoles = roles.map((r) => (r.id === role.id ? role : r))
    } else {
      updatedRoles = [...roles, { ...role, id: Date.now() }]
    }
    setRoles(updatedRoles)
    localStorage.setItem("roles", JSON.stringify(updatedRoles))
    setSelectedRole(null)
  }

  return (
    <div className="container mx-auto p-4 bg-[#FAFAFA]">
      <h1 className="text-2xl font-bold mb-4 text-black">Gestión de Roles y Permisos</h1>
      {!selectedRole ? (
        <>
          <RoleList roles={roles} onEditRole={handleEditRole} onCreateRole={handleCreateRole} />
          <ActiveRules roles={roles} />
        </>
      ) : (
        <RoleForm role={selectedRole} onSave={handleSaveRole} onCancel={() => setSelectedRole(null)} />
      )}
    </div>
  )
}

