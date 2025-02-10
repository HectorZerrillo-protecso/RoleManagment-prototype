import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function ActiveRoles({ roles, onEditRole, onDeleteRole, onCreateRole }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Roles</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Rol</TableHead>
            <TableHead>Recursos</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => {
            const recursos = role.permissions
              .map((p) => p.resource)
              .filter((value, index, self) => self.indexOf(value) === index)
              .join(", ")
            return (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{recursos}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onEditRole(role)}>
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDeleteRole(role)}>
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Button className="mt-4 bg-[#6202b6] text-white hover:bg-[#4a0189]" onClick={onCreateRole}>
        Crear Nuevo Rol
      </Button>
    </div>
  )
}