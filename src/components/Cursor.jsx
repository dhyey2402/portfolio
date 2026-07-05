import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;
    let hasMoved = false;

    const onMove = (e) => { 
      x = e.clientX; 
      y = e.clientY; 
      if (!hasMoved) {
        hasMoved = true;
        if (dot.current) dot.current.style.opacity = 1;
        if (ring.current) ring.current.style.opacity = 1;
      }
    };
    
    // Set initial opacity to 0
    if (dot.current) dot.current.style.opacity = 0;
    if (ring.current) ring.current.style.opacity = 0;

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onOver = (e) => {
      const t = e.target;
      const interactive = t.closest && t.closest('a, button, [data-cursor="hover"], input, textarea, .proj-card');
      if (ring.current) ring.current.classList.toggle('expand', !!interactive);
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
