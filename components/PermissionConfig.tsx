"use client"

import { useState, useEffect } from "react"
import { DefaultValues } from "@/components/DefaultValues"
import { PermissionForm } from "@/components/PermissionForm"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

export function PermissionConfig({ permissions, onPermissionsChange }) {
  const [currentPermission, setCurrentPermission] = useState({
    resource: "",
    specificResource: "",
    actions: ["Solo lectura"],
    businessUnit: "",
    workArea: "",
    resourceType: "",
  })
  const [errors, setErrors] = useState({})
  const [warning, setWarning] = useState('')
  const [showPermissionForm, setShowPermissionForm] = useState(permissions.length === 0)

  useEffect(() => {
    if (currentPermission.specificResource === "specific" && currentPermission.specificResource.split(",").length === 0) {
      setWarning("Debes seleccionar al menos un recurso específico")
    } else {
      setWarning('')
    }
  }, [currentPermission.specificResource])

  const handleAddPermission = () => {
    const newErrors = {}
    if (!currentPermission.resource) newErrors.resource = "Seleccione un recurso"
    if (currentPermission.actions.length === 0) newErrors.actions = "Seleccione al menos una acción"
    if (currentPermission.specificResource === "specific" && currentPermission.specificResource.split(",").length === 0) {
      newErrors.specificResource = "Debes seleccionar al menos un recurso"
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      let filters = ""
      if (currentPermission.businessUnit && currentPermission.workArea) {
        filters = `unidad de negocio: ${currentPermission.businessUnit}; areas: ${currentPermission.workArea}`
      } else if (currentPermission.businessUnit) {
        filters = `unidad de negocio: ${currentPermission.businessUnit}`
      } else if (currentPermission.workArea) {
        filters = `areas: ${currentPermission.workArea}`
      } else {
        filters = "ninguno"
      }

      const permissionDescription = `Permiso de: '${currentPermission.actions.join(" y ")}'; recurso: '${currentPermission.resource}', filtros: '${filters}'`
  
      onPermissionsChange([...permissions, { ...currentPermission, description: permissionDescription }])
  
      setCurrentPermission({
        resource: "",
        specificResource: "",
        actions: ["Solo lectura"],
        businessUnit: "",
        workArea: "",
        resourceType: "",
      })
      setErrors({})
      setShowPermissionForm(false)
    }
  }

  const handleRemovePermission = (index) => {
    const newPermissions = permissions.filter((_, i) => i !== index)
    onPermissionsChange(newPermissions)
    if (newPermissions.length === 0) {
      setShowPermissionForm(true)
    }
  }

  return (
    <div className="space-y-6 border p-4 rounded bg-white">
      <h4 className="font-medium text-black mb-2">Permisos Agregados:</h4>
      {permissions.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {permissions.map((permission, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{permission.description}</span>
              <Button variant="ghost" size="sm" onClick={() => handleRemovePermission(index)}>
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic mb-4">No hay permisos agregados</p>
      )}

      {!showPermissionForm ? (
        <Button onClick={() => setShowPermissionForm(true)} className="bg-[#6202b6] text-white hover:bg-[#4a0189]">
          <Plus className="h-4 w-4 mr-2" /> Añadir un Nuevo Permiso
        </Button>
      ) : (
        <div className="border p-4 rounded bg-[#FAFAFA]">
          <h3 className="text-lg font-semibold text-black mb-4">Configurar Permiso</h3>
          <PermissionForm
            value={currentPermission}
            onChange={(value) => {
              setCurrentPermission({ ...currentPermission, ...value })
            }}
            errors={errors}
          />
          {errors.resource && <p className="text-red-500 text-sm mt-1">{errors.resource}</p>}
          {warning && <p className="text-yellow-500 text-sm mt-1">{warning}</p>}
          {errors.actions && <p className="text-red-500 text-sm mt-1">{errors.actions}</p>}
          {errors.specificResource && <p className="text-red-500 text-sm mt-1">{errors.specificResource}</p>}
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setShowPermissionForm(false)} variant="outline">
              Cancelar
            </Button>
            <Button onClick={handleAddPermission} className="bg-[#6202b6] text-white hover:bg-[#4a0189]">
              Guardar Permiso
            </Button>
          </div>
        </div>
      )}

      <div className="border-t pt-4 mt-4">
        <DefaultValues />
      </div>
    </div>
  )
}