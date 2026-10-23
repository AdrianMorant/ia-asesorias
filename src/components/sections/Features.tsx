import React from 'react';
import styles from './Features.module.css';
import { Search, Scale, ShieldCheck, Cpu, TrendingUp, UserCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    tag: 'Extracción Multimodal',
    title: 'Lectura completa de todos los campos clave',
    desc: 'Identifica emisor, CIF/NIF, número de documento, fecha de devengo, desglose de bases por tipo de IVA (4%, 10%, 21%), recargo de equivalencia, IRPF y total con independencia del formato o diseño del emisor.',
  },
  {
    icon: Scale,
    tag: 'Validación Matemática',
    title: 'Verificación de cuadre aritmético riguroso',
    desc: 'Calcula y valida automáticamente que Base Imponible + IVA - Retenciones = Total antes de registrar nada. Si hay un céntimo de descuadre o error tipográfico en la factura, salta una alerta inmediata.',
  },
  {
    icon: ShieldCheck,
    tag: 'Filtro Anti-Duplicados',
    title: 'Detección proactiva de facturas repetidas',
    desc: 'Compara el número de factura, el CIF del proveedor y el importe con todas las facturas procesadas previamente. Se acabaron los asientos duplicados cuando un cliente reenvía el mismo PDF.',
  },
  {
    icon: Cpu,
    tag: 'Mapeo Contable PGC',
    title: 'Propuesta de cuenta de gastos / ingresos',
    desc: 'Asigna automáticamente la subcuenta contable correspondiente según el proveedor y concepto (ej. 629 para material, 628 para suministros), respetando el plan contable propio de cada cliente.',
  },
  {
    icon: TrendingUp,
    tag: 'Aprendizaje Continuo',
    title: 'Aprende de tus correcciones',
    desc: 'Si cambias una cuenta asignada a un proveedor, el sistema registra tu preferencia. La próxima factura de ese mismo emisor ya vendrá con tu criterio aplicado sin tener que programar reglas rígidas.',
  },
  {
    icon: UserCheck,
    tag: 'Human-in-the-Loop',
    title: 'Control total y validación asistida',
    desc: 'Un panel de confianza clasifica las facturas: las evidentes (95%+ de fiabilidad) quedan listas para volcar, y las que presenten cualquier duda se revisan en un clic con la factura visible al lado.',
  },
];

const Features: React.FC = () => {
  return (
    <section className={styles.section} id="funcionalidades">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Capacidades del Sistema</span>
          <h2 className={styles.title}>Diseñado específicamente para las exigencias de un despacho</h2>
          <p className={styles.subtitle}>
            No es un OCR genérico. Es un motor de automatización contable con rigor fiscal español y adaptación a tu forma de trabajar.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => {
            const IconComp = f.icon;
            return (
              <div key={i} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.icon}>
                    <IconComp size={22} />
                  </div>
                  <span className={styles.tag}>{f.tag}</span>
                </div>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
