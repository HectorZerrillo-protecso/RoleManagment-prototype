import { Button } from "@/components/ui/button"

export function RoleList({ roles, onEditRole, onCreateRole }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 text-black">Lista de Roles</h2>
      <p className="text-sm text-gray-600 mb-4">
        Visualiza y gestiona los roles disponibles. Puedes asignar permisos específicos a cada rol.
      </p>
      <div className="space-y-2">
        {roles.map((role) => (
          <div key={role.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            <span>{role.name}</span>
            <Button variant="outline" size="sm" onClick={() => onEditRole(role)}>
              Editar
            </Button>
          </div>
        ))}
      </div>
      <Button className="mt-4 bg-[#6202b6] text-white hover:bg-[#4a0189]" onClick={onCreateRole}>
        Crear Nuevo Rol
      </Button>
    </div>
  )
}

