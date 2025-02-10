import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PermissionForm({ value, onChange, errors }) {
  const [showBusinessUnits, setShowBusinessUnits] = useState(false)
  const [showJourneys, setShowJourneys] = useState(false)
  const [showAreas, setShowAreas] = useState(false)
  const [showAvatars, setShowAvatars] = useState(false)

  const resourceFilters = {
    "Todos los recursos": [],
    "Journeys Map": ["businessUnit", "avatars"],
    "Submomentos": ["journey", "businessUnit"],
    "Avatares": [],
    "Aplicaciones": ["businessUnit", "workArea"],
    "Procesos": ["businessUnit", "workArea"],
    "Iniciativas": ["businessUnit", "workArea"],
    "Areas": [],
    "Unidades de Negocio": [],
    "Gestion de Usuarios": []
  }

  const actions = ["Solo lectura", "Lectura y Escritura", "Lectura, Escritura y Eliminar"]

  const businessUnits = ["Universidad Continental", "Universidad Continental América (EE.UU.)", "Postgrado"]
  const areas = ["TI", "Recursos Humanos", "Marketing"]
  const journeys = ["Docente pregrado", "Estudiante pregrado"]
  const avatars = ["Juana", "Menganito", "Fulanito"]

  useEffect(() => {
    if (value.resource && value.actions.length === 0) {
      onChange({ ...value, actions: ["Solo lectura"] })
    }
  }, [value.resource, onChange])

  const handleResourceChange = (resource) => {
    if (value.resource !== resource) {
      // Si se selecciona "Journeys Map" se activa el filtro de Unidad de Negocio e incluye "Avatares"
      if (resource === "Journeys Map") {
        let currentUnits = value.businessUnit ? value.businessUnit.split(",") : []
        if (!currentUnits.includes("Avatares")) {
          currentUnits.push("Avatares")
        }
        setShowBusinessUnits(true)
        onChange({ resource, actions: ["Solo lectura"], businessUnit: currentUnits.join(",") })
        return
      }
      onChange({ resource, actions: ["Solo lectura"] })
    }
  }

  const handleActionChange = (action) => {
    onChange({ ...value, actions: [action] })
  }

  const handleBusinessUnitChange = (unit) => {
    const currentUnits = value.businessUnit ? value.businessUnit.split(",") : []
    const updatedUnits = currentUnits.includes(unit)
      ? currentUnits.filter((u) => u !== unit)
      : [...currentUnits, unit]
    onChange({ businessUnit: updatedUnits.join(",") })
  }

  const handleAreaChange = (area) => {
    const currentAreas = value.workArea ? value.workArea.split(",") : []
    const updatedAreas = currentAreas.includes(area) ? currentAreas.filter((a) => a !== area) : [...currentAreas, area]
    onChange({ workArea: updatedAreas.join(",") })
  }

  const handleJourneyChange = (journey) => {
    const currentJourneys = value.journey ? value.journey.split(",") : []
    const updatedJourneys = currentJourneys.includes(journey)
      ? currentJourneys.filter((j) => j !== journey)
      : [...currentJourneys, journey]
    onChange({ journey: updatedJourneys.join(",") })
  }

  const handleAvatarChange = (avatar) => {
    const currentAvatars = value.avatars ? value.avatars.split(",") : []
    const updatedAvatars = currentAvatars.includes(avatar)
      ? currentAvatars.filter((a) => a !== avatar)
      : [...currentAvatars, avatar]
    onChange({ avatars: updatedAvatars.join(",") })
  }

  const renderFilters = () => {
    const filters = resourceFilters[value.resource] || []
    if (filters.length === 0) return null

    return (
      <>
        <h4 className="font-medium text-black">Aplicar el permiso si el recurso pertenece a:</h4>
        {filters.map((filter, index) => {
          const isLast = index === filters.length - 1
          return (
            <div key={filter}>
              {filter === "businessUnit" && (
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
                      <SelectItem value="any">Cualquier Unidad De Negocio</SelectItem>
                      <SelectItem value="specific">Seleccionar específico</SelectItem>
                    </SelectContent>
                  </Select>
                  {showBusinessUnits && (
                    <div className="pl-4 space-y-2">
                      {businessUnits.map((unit) => (
                        <div key={unit} className="flex items-center space-x-2">
                          <Checkbox
                            id={unit}
                            checked={value.businessUnit?.split(",").includes(unit)}
                            onCheckedChange={() => handleBusinessUnitChange(unit)}
                          />
                          <label htmlFor={unit}>{unit}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {filter === "workArea" && (
                <div className="space-y-2">
                  <Select
                    value={showAreas ? "specific" : "any"}
                    onValueChange={(val) => {
                      setShowAreas(val === "specific")
                      onChange({ workArea: val === "specific" ? "" : "Cualquier" })
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Seleccionar Área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Cualquier Área</SelectItem>
                      <SelectItem value="specific">Seleccionar específica</SelectItem>
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
              {filter === "journey" && (
                <div className="space-y-2">
                  <Select
                    value={showJourneys ? "specific" : "any"}
                    onValueChange={(val) => {
                      setShowJourneys(val === "specific")
                      onChange({ journey: val === "specific" ? "" : "Cualquier" })
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Seleccionar Journey" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Cualquier Journey</SelectItem>
                      <SelectItem value="specific">Seleccionar específico</SelectItem>
                    </SelectContent>
                  </Select>
                  {showJourneys && (
                    <div className="pl-4 space-y-2">
                      {journeys.map((journey) => (
                        <div key={journey} className="flex items-center space-x-2">
                          <Checkbox
                            id={journey}
                            checked={value.journey?.split(",").includes(journey)}
                            onCheckedChange={() => handleJourneyChange(journey)}
                          />
                          <label htmlFor={journey}>{journey}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {filter === "avatars" && (
                <div className="space-y-2">
                  <Select
                    value={showAvatars ? "specific" : "any"}
                    onValueChange={(val) => {
                      setShowAvatars(val === "specific")
                      onChange({ avatars: val === "specific" ? "" : "Cualquier" })
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
              {!isLast && (
                <Tooltip>
                  <TooltipTrigger>
                    <div className="text-center ml-2 mt-4 font-bold text-lg">Y</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Este permiso solo será efectivo si el recurso cumple con todos los filtros.
                      No basta con cumplir solo uno.
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )
        })}
      </>
    )
  }

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
            {Object.keys(resourceFilters).map((resource) => (
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
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
        {renderFilters()}
      </div>
    </TooltipProvider>
  )
}