import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function PermissionForm({ value, onChange, errors }) {
  const [showSpecific, setShowSpecific] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [showBusinessUnits, setShowBusinessUnits] = useState(false)
  const [showAreas, setShowAreas] = useState(false)
  const [showJourneys, setShowJourneys] = useState(false)

  const resources = ["Todos los recursos", "Submomentos", "Avatares", "Aplicaciones", "Procesos", "Iniciativas", "Areas", "Unidades de Negocio", "Gestion de Usuarios"]

  const specificResources = {
    Iniciativas: ["Iniciativa A", "Iniciativa B", "Iniciativa C"],
    Aplicaciones: ["Portal del Postulante", "CRM Dynamics 365", "Plataforma para festion de incidencias"],
    Areas: ["TI", "Recursos Humanos", "Marketing"],
    "Unidades de Negocio": ["Universidad Continental", "Universidad Continental América (EE.UU.)", "Postgrado"],
    Procesos:  ["Captación Digital",  "Captación B2B", "Conversión Admisión"],
    Submomentos: ["Bachiller", "Exploro y me entero", "Realizo mi proceso de matrícula"],
    Avatares: ["Roberto", "Victoria", "Hebert"],
    "Gestion de Usuarios": []
  }

  const allActions = [
    { id: "read", label: "Lectura" },
    { id: "create", label: "Crear" },
    { id: "modify", label: "Modificar" },
    { id: "delete", label: "Eliminar" },

  ]

  const limitedActions = [
    { id: "read", label: "Lectura" },
    { id: "modify", label: "Modificar" },
    { id: "delete", label: "Eliminar" },
  ]

  const actions = showSpecific ? limitedActions : allActions

  const businessUnits = ["Universidad Continental", "Universidad Continental América (EE.UU.)", "Postgrado"]
  const areas = ["TI", "Recursos Humanos", "Marketing"]
  const journeys = ["Todos los journeys", "Docente pregrado", "Estudiante pregrado"]

  useEffect(() => {
    if (value.resource && value.resource !== "Todos los recursos") {
      setShowSpecific(true)
    } else {
      setShowSpecific(false)
    }
  }, [value.resource])

  useEffect(() => {
    if (showSpecific && value.actions.length === 0) {
      onChange({ ...value, actions: ["read"] })
    } else if (!showSpecific && value.actions.length === 0) {
      onChange({ ...value, actions: ["read", "create", "modify", "delete"] })
    }
  }, [showSpecific, onChange])

  const handleResourceChange = (resource) => {
    if (value.resource !== resource) {
      const defaultActions = resource === "Gestion de Usuarios" ? ["read"] : ["read", "create", "modify", "delete"]
      onChange({ resource, specificResource: "", actions: defaultActions })
    }
  }

  const handleSpecificChange = (item) => {
    const currentSpecific = value.specificResource ? value.specificResource.split(",") : []
    const updatedSpecific = currentSpecific.includes(item)
      ? currentSpecific.filter((i) => i !== item)
      : [...currentSpecific, item]
    onChange({ ...value, specificResource: updatedSpecific.join(",") })
  }

  const handleActionChange = (actionId) => {
    let updatedActions = [...value.actions]
    const isReadAction = actionId === "read" || actionId === "readOwn"
  
    if (updatedActions.includes(actionId)) {
      updatedActions = updatedActions.filter((id) => id !== actionId)
    } else {
      updatedActions.push(actionId)
    }
  
    if (isReadAction && !updatedActions.includes("read") && !updatedActions.includes("readOwn")) {
      setShowAlert(true)
      setPendingAction(actionId)
      return
    }
  
    onChange({ ...value, actions: updatedActions })
  }
  const handleAlertConfirm = () => {
    const updatedActions = value.actions.filter((id) => id !== "read" && id !== "readOwn")
    onChange({ ...value, actions: updatedActions })
    setShowAlert(false)
    setPendingAction(null)
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

  const hasFilters = ["Iniciativas", "Aplicaciones", "Procesos", "Submomentos"].includes(value.resource)

  return (
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
      {value.resource && value.resource !== "Todos los recursos" && specificResources[value.resource].length > 0 && (
        <Select
          value={showSpecific ? "specific" : "all"}
          onValueChange={(val) => {
            setShowSpecific(val === "specific")
            onChange({ ...value, specificResource: val === "specific" ? "" : "all", actions: val === "specific" ? ["read"] : ["read", "create", "modify", "delete"] })
          }}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder={`Seleccionar ${value.resource}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los {value.resource}</SelectItem>
            <SelectItem value="specific">Seleccionar específico</SelectItem>
          </SelectContent>
        </Select>
      )}
      {showSpecific && value.resource && value.resource !== "Todos los recursos" && (
        <div className="pl-4 space-y-2">
          {specificResources[value.resource].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={value.specificResource.split(",").includes(item)}
                onCheckedChange={() => handleSpecificChange(item)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
          {errors && errors.specificResource && (
            <p className="text-red-500 text-sm mt-1">{errors.specificResource}</p>
          )}
        </div>
      )}
      {value.resource && (
        <>
          <h4 className="font-medium text-black mt-6">Acciones Permitidas:</h4>
          {actions.map((action) => (
            <div key={action.id} className="flex items-center space-x-2">
              <Checkbox
                id={action.id}
                checked={value.actions.includes(action.id)}
                onCheckedChange={() => handleActionChange(action.id)}
              />
              <label htmlFor={action.id}>{action.label}</label>
            </div>
          ))}
          <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Estás a punto de desactivar totalmente la lectura. Los demás permisos como Modificar o Eliminar perderán
                  sentido si el usuario no puede ver ningún recurso.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-[#6202b6] text-white" onClick={handleAlertConfirm}>Estoy seguro</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
      {hasFilters && (
        <>
          <h4 className="font-medium text-black">Aplicar el permiso si el recurso pertenece a:</h4>
          {["Iniciativas", "Aplicaciones", "Procesos"].includes(value.resource) && (
            <>
              <div className="space-y-2">
                <Select
                  value={showBusinessUnits ? "specific" : "any"}
                  onValueChange={(val) => {
                    setShowBusinessUnits(val === "specific")
                    onChange({ businessUnit: val === "specific" ? "" : "Cualquier unidad de negocio" })
                  }}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Seleccionar Unidad de Negocio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquier unidad de negocio</SelectItem>
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
              <div className="space-y-2">
                <Select
                  value={showAreas ? "specific" : "any"}
                  onValueChange={(val) => {
                    setShowAreas(val === "specific")
                    onChange({ workArea: val === "specific" ? "" : "Cualquier área" })
                  }}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Seleccionar Área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquier área</SelectItem>
                    <SelectItem value="specific">Seleccionar específico</SelectItem>
                  </SelectContent>
                </Select>
                {showAreas && (
                  <div className="pl-4 space-y-2">
                    {areas.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={value.workArea.split(",").includes(area)}
                          onCheckedChange={() => handleAreaChange(area)}
                        />
                        <label htmlFor={area}>{area}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {value.resource === "Submomentos" && (
            <div className="space-y-2">
              <Select
                value={showJourneys ? "specific" : "any"}
                onValueChange={(val) => {
                  setShowJourneys(val === "specific")
                  onChange({ journey: val === "specific" ? "" : "Todos los journeys" })
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccionar Journey" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Todos los journeys</SelectItem>
                  <SelectItem value="specific">Seleccionar específico</SelectItem>
                </SelectContent>
              </Select>
              {showJourneys && (
                <div className="pl-4 space-y-2">
                  {journeys.map((journey) => (
                    <div key={journey} className="flex items-center space-x-2">
                      <Checkbox
                        id={journey}
                        checked={value.journey === journey}
                        onCheckedChange={() => handleJourneyChange(journey)}
                      />
                      <label htmlFor={journey}>{journey}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}