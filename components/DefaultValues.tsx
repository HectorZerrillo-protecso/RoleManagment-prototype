import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function DefaultValues() {
  // Usamos un estado controlado para manejar el valor seleccionado
  const [selectedValue, setSelectedValue] = useState("read") // Valor inicial 'read'

  // Manejo del cambio de valor
  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Valores por Defecto para Recursos No Especificados:</h4>
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="read" id="read" />
          <Label htmlFor="read">Solo lectura</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none">Sin acceso</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
