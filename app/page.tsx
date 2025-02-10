import RoleManagement from "../components/RoleManagement"

export default function Home() {
  return (
    <div className="container mx-auto p-4 bg-[#FAFAFA]">
      <h1 className="text-2xl font-bold mb-4 text-black">Gestión de Roles y Permisos</h1>
      <RoleManagement />
    </div>
  )
}

