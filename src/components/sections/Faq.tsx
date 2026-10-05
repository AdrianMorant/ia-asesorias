import React, { useState } from 'react';
import styles from './Faq.module.css';

const FAQS = [
  {
    q: '¿Tengo que cambiar el software contable que usamos en el despacho?',
    a: 'No, bajo ningún concepto. El valor fundamental de nuestro servicio es que no cambiamos tu operativa ni tu ERP (Holded, Sage, a3innuva, Contasol, etc.). La IA funciona como una capa conectada que lee las facturas, extrae los datos y envía los asientos a tu programa habitual.',
  },
  {
    q: '¿Qué porcentaje de acierto tiene la extracción?',
    a: 'En facturas electrónicas y PDFs digitales supera el 98%. En facturas escaneadas o fotos de tickets ronda el 93-95%. Aquellas facturas con cualquier grado de incertidumbre se marcan automáticamente para revisión rápida con un visor interactivo, garantizando que nunca se registre un dato dudoso.',
  },
  {
    q: '¿Cómo sabe el sistema a qué subcuenta contable imputar cada gasto?',
    a: 'Analizamos el historial contable de tu asesoría para cada cliente. La IA reconoce los proveedores habituales y sus cuentas asociadas (ej. 628 para suministros, 629 para material de oficina). Además, si en un cliente específico utilizáis un criterio particular, el sistema lo memoriza.',
  },
  {
    q: '¿Qué pasa si mi equipo corrige una cuenta propuesta por la IA?',
    a: 'El sistema incorpora esa corrección de forma inmediata en su base de conocimiento. La próxima vez que llegue una factura de ese mismo proveedor o concepto para ese cliente, aplicará automáticamente el nuevo criterio.',
  },
  {
    q: '¿Cómo se detectan las facturas duplicadas?',
    a: 'Cruzamos de forma instantánea el número de factura, el CIF del emisor, la fecha y el importe total contra el histórico del cliente. Si detecta una coincidencia idéntica o sospechosa, te avisa en pantalla para evitar registrar el gasto dos veces.',
  },
  {
    q: '¿Cómo podemos hacer una prueba antes de comprometernos?',
    a: 'Muy sencillo: concertamos una sesión de 20 minutos donde procesamos un lote de 20-30 facturas reales y variadas de tu despacho (incluso las más complicadas o en formatos difíciles) para que veas en directo la extracción, el cuadre y la propuesta de asientos.',
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge--blue">Preguntas Frecuentes</span>
          <h2 className={styles.title}>Dudas habituales de los despachos profesionales</h2>
          <p className={styles.subtitle}>
            Respuestas claras y directas a las preguntas que se hace todo responsable de asesoría antes de automatizar.
          </p>
        </div>

        <div className={styles.list}>
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  className={styles.questionBtn}
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className={styles.answerBox}>
                    <p className={styles.answerText}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
