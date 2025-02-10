import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ActiveRoles({ roles }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Roles</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rol</TableHead>
            <TableHead>Recurso</TableHead>
            <TableHead>Permiso Asignado</TableHead>
            <TableHead>Unidad de Negocio / Área</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.flatMap((role) =>
            role.permissions.map((permission, index) => (
              <TableRow key={`${role.id}-${index}`}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {permission.resource} {permission.specificResource !== "all" && `(${permission.specificResource})`}
                </TableCell>
                <TableCell>{permission.actions.join(", ")}</TableCell>
                <TableCell>
                  {permission.businessUnit} / {permission.workArea}
                </TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>
  )
}

