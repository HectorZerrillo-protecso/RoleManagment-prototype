"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PermissionConfig } from "./PermissionConfig"
import { useRouter } from "next/navigation"

export function RoleForm({ role }) {
  const [name, setName] = useState(role.name)
  const [permissions, setPermissions] = useState(role.permissions || [])
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const handleSave = () => {
    const newErrors = {}
    if (!name) newErrors.name = "El nombre del rol es requerido"
    if (permissions.length === 0) newErrors.permissions = "Debe agregar al menos un permiso"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      const updatedRole = { ...role, name, permissions }
      const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]")
      let updatedRoles
      if (role.id) {
        updatedRoles = storedRoles.map((r) => (r.id === role.id ? updatedRole : r))
      } else {
        updatedRole.id = Date.now()
        updatedRoles = [...storedRoles, updatedRole]
      }
      localStorage.setItem("roles", JSON.stringify(updatedRoles))
      router.push("/")
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder="Nombre del Rol"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <PermissionConfig permissions={permissions} onPermissionsChange={setPermissions} />
      {errors.permissions && <p className="text-red-500 text-sm">{errors.permissions}</p>}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => router.push("/")}>
          Cancelar
        </Button>
        <Button onClick={handleSave} className="bg-[#6202b6] text-white hover:bg-[#4a0189]">
          Guardar
        </Button>
      </div>
    </div>
  )
}

