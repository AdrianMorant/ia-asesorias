export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Phase {
  phase: string;
  title: string;
  items: string[];
}

export interface ConfidenceLevel {
  label: string;
  score: string;
  action: string;
  color: 'green' | 'amber' | 'red';
}

export interface ContactFormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  facturasmes: string;
  software: string;
  proceso: string;
  mensaje: string;
}
