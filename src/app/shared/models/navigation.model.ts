export interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
}

export const NAVIGATION_ITEMS: NavItem[] = [

  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  { label: 'Crea Usuarios', icon: 'people', route: '/usuariosdataentry' },
  { label: 'Listado vs Usuarios', icon: 'people', route: '/usuariosreporte' },
  { label: 'Listado Usuarios', icon: 'people', route: '/usersreporte' },
  { label: 'Listado de Grupos Procesos PTY', icon: 'group', route: '/listadogrupos' },
  { label: 'Listado de Reportes', icon: 'people', route: '/listadoreportes' },
  { label: 'Combo de Reportes', icon: 'people', route: '/comboreportes' },

];
