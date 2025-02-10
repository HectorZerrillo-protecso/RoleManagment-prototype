import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PermissionForm({ value, onChange, errors }) {
  const [showBusinessUnits, setShowBusinessUnits] = useState(false)
  const [showAreas, setShowAreas] = useState(false)
  const [showJourneys, setShowJourneys] = useState(false)
  const [showAvatars, setShowAvatars] = useState(false)

  const resources = ["Todos los recursos", "Journeys Map", "Submomentos", "Avatares", "Aplicaciones", "Procesos", "Iniciativas", "Areas", "Unidades de Negocio", "Gestion de Usuarios"]

  const actions = [
    { id: "Solo lectura", label: "Solo lectura" },
    { id: "Lectura y Escritura", label: "Lectura y Escritura" },
    { id: "Lectura, Escritura y Eliminar", label: "Lectura, Escritura y Eliminar" },
  ]

  const businessUnits = ["Universidad Continental", "Universidad Continental América (EE.UU.)", "Postgrado"]
  const areas = ["TI", "Recursos Humanos", "Marketing"]
  const journeys = ["Todos los journeys", "Docente pregrado", "Estudiante pregrado"]
  const avatars = ["Juana", "Menganito", "Fulanito"]

  useEffect(() => {
    if (value.resource && value.actions.length === 0) {
      onChange({ ...value, actions: ["Solo lectura"] })
    }
  }, [value.resource, onChange])

  const handleResourceChange = (resource) => {
    if (value.resource !== resource) {
      onChange({ resource, actions: ["Solo lectura"] })
    }
  }

  const handleActionChange = (actionId) => {
    onChange({ ...value, actions: [actionId] })
  }

  const handleBusinessUnitChange = (unit) => {
    const currentUnits = value.businessUnit ? value.businessUnit.split(",") : []
    const updatedUnits = currentUnits.includes(unit) ? currentUnits.filter((u) => u !== unit) : [...currentUnits, unit]
    onChange({ businessUnit: updatedUnits.join(",") })
  }

  const handleAreaChange = (area) => {
    const currentAreas = value.workArea ? value.workArea.split(",") : []
    const updatedAreas = currentAreas.includes(area) ? currentAreas.filter((a) => a !== area) : [...currentAreas, area]
    onChange({ workArea: updatedAreas.join(",") })
  }

  const handleJourneyChange = (journey) => {
    onChange({ journey })
  }

  const handleAvatarChange = (avatar) => {
    const currentAvatars = value.avatars ? value.avatars.split(",") : []
    const updatedAvatars = currentAvatars.includes(avatar) ? currentAvatars.filter((a) => a !== avatar) : [...currentAvatars, avatar]
    onChange({ avatars: updatedAvatars.join(",") })
  }

  const hasFilters = ["Iniciativas", "Aplicaciones", "Procesos", "Submomentos", "Journeys Map"].includes(value.resource)

  return (
    <TooltipProvider>
      <div className="space-y-4 mt-8">
        <Select
          value={value.resource}
          onValueChange={handleResourceChange}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Seleccionar tipo de recurso" />
          </SelectTrigger>
          <SelectContent>
            {resources.map((resource) => (
              <SelectItem key={resource} value={resource}>
                {resource}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value.resource && (
          <>
            <h4 className="font-medium text-black mt-6">Acciones Permitidas:</h4>
            <Select
              value={value.actions[0]}
              onValueChange={handleActionChange}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Seleccionar acción permitida" />
              </SelectTrigger>
              <SelectContent>
                {actions.map((action) => (
                  <SelectItem key={action.id} value={action.id}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
{hasFilters && (
  <>
    <h4 className="font-medium text-black">Aplicar el permiso si el recurso pertenece a:</h4>
    <div className="space-y-4">
      {/* Grupo 1: Filtro de Unidad de Negocio */}
      <div className="space-y-2">
        <Select
          value={showBusinessUnits ? "specific" : "any"}
          onValueChange={(val) => {
            setShowBusinessUnits(val === "specific")
            onChange({ businessUnit: val === "specific" ? "" : "Cualquier" })
          }}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Seleccionar Unidad de Negocio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Cualquiera Unidad De Negocio</SelectItem>
            <SelectItem value="specific">Seleccionar específico</SelectItem>
          </SelectContent>
        </Select>
        {showBusinessUnits && (
          <div className="pl-4 space-y-2">
            {businessUnits.map((unit) => (
              <div key={unit} className="flex items-center space-x-2">
                <Checkbox
                  id={unit}
                  checked={value.businessUnit.split(",").includes(unit)}
                  onCheckedChange={() => handleBusinessUnitChange(unit)}
                />
                <label htmlFor={unit}>{unit}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Si existe un segundo filtro, se muestra el separador "Y" */}
      {(value.resource === "Journeys Map" ||
        ["Iniciativas", "Aplicaciones", "Procesos"].includes(value.resource)) && (
        <Tooltip>
          <TooltipTrigger>
            <div className="text-center ml-2 font-bold text-lg">Y</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Este permiso solo será efectivo si el recurso cumple con todos los
              filtros. No basta con cumplir solo uno.
            </p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Grupo 2: Filtro dependiendo del recurso */}
      {value.resource === "Journeys Map" && (
        <div className="space-y-2">
          <Select
            value={showAvatars ? "specific" : "any"}
            onValueChange={(val) => {
              setShowAvatars(val === "specific")
              onChange({ avatars: val === "specific" ? "" : "cualquiera" })
            }}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Seleccionar Avatar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquier Avatar</SelectItem>
              <SelectItem value="specific">Seleccionar específico</SelectItem>
            </SelectContent>
          </Select>
          {showAvatars && (
            <div className="pl-4 space-y-2">
              {avatars.map((avatar) => (
                <div key={avatar} className="flex items-center space-x-2">
                  <Checkbox
                    id={avatar}
                    checked={value.avatars?.split(",").includes(avatar)}
                    onCheckedChange={() => handleAvatarChange(avatar)}
                  />
                  <label htmlFor={avatar}>{avatar}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {["Iniciativas", "Aplicaciones", "Procesos"].includes(value.resource) && (
        <div className="space-y-2">
          <Select
            value={showAreas ? "specific" : "any"}
            onValueChange={(val) => {
              setShowAreas(val === "specific")
              onChange({ workArea: val === "specific" ? "" : "cualquiera" })
            }}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Seleccionar Área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquier Área</SelectItem>
              <SelectItem value="specific">Seleccionar específico</SelectItem>
            </SelectContent>
          </Select>
          {showAreas && (
            <div className="pl-4 space-y-2">
              {areas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={value.workArea?.split(",").includes(area)}
                    onCheckedChange={() => handleAreaChange(area)}
                  />
                  <label htmlFor={area}>{area}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  </>
)}
      </div>
    </TooltipProvider>
  )
}