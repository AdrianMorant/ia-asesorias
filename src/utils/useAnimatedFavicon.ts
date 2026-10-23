import { useEffect } from 'react';

const COLOR_STEPS = [
  { bg1: '#06101E', bg2: '#0B2046', glow: '#0A78FC', accent: '#0A78FC' },
  { bg1: '#05141F', bg2: '#0A2B3D', glow: '#00D4B2', accent: '#00D4B2' },
  { bg1: '#081329', bg2: '#0E2B5C', glow: '#38BDF8', accent: '#38BDF8' },
  { bg1: '#0B1028', bg2: '#181B4E', glow: '#6366F1', accent: '#6366F1' },
  { bg1: '#110D28', bg2: '#20164D', glow: '#8B5CF6', accent: '#8B5CF6' },
  { bg1: '#07152B', bg2: '#0D274F', glow: '#0EA5E9', accent: '#0EA5E9' },
];

function buildSvgDataUri(c: typeof COLOR_STEPS[0]): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bg1}"/>
      <stop offset="100%" stop-color="${c.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="65%" cy="35%" r="70%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.65"/>
      <stop offset="60%" stop-color="${c.glow}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#bg)"/>
  <rect width="100" height="100" rx="22" fill="url(#glow)"/>
  <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="21.25" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none"/>
  <g transform="translate(6, 6) scale(0.88)" filter="url(#sh)">
    <rect x="20" y="16" width="16" height="68" rx="4" fill="#FFFFFF"/>
    <path d="M36 50 L62 84 H82 L47 38 Z" fill="#FFFFFF"/>
    <path d="M24 64 L66 26 L76 34 L88 12 L54 16 L61 23 L20 60 Z" fill="${c.accent}"/>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function useAnimatedFavicon() {
  useEffect(() => {
    // Si el usuario prefiere reducir el movimiento, respetamos la accesibilidad
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon'][type='image/svg+xml']");
    if (!link) {
      link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    }
    if (!link) return;

    let stepIndex = 0;
    let timer: number | null = null;

    const tick = () => {
      if (document.hidden) return; // Suspender cuando la pestaña está en segundo plano para ahorrar batería
      stepIndex = (stepIndex + 1) % COLOR_STEPS.length;
      if (link) {
        link.href = buildSvgDataUri(COLOR_STEPS[stepIndex]);
      }
    };

    // Actualizar cada 2.2 segundos para una cadencia suave y fluida
    timer = window.setInterval(tick, 2200);

    const onVisibilityChange = () => {
      if (!document.hidden) {
        tick();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      // Restaurar el SVG original al desmontar
      if (link) {
        link.href = '/favicon.svg';
      }
    };
  }, []);
}
