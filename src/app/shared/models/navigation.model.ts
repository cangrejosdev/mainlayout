export interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Inicio', icon: 'home', route: '/' },
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  { label: 'Perfil', icon: 'person', route: '/profile' },
  { label: 'Acerca de', icon: 'info', route: '/about' }
];
