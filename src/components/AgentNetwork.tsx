import { useEffect, useRef } from "react";
import iconIntegrations from "@/assets/icon-integrations.svg";
import iconNotifications from "@/assets/icon-notifications.svg";
import iconAiMatch from "@/assets/icon-ai-match.svg";
import iconLocation from "@/assets/icon-location.svg";
import iconAvailability from "@/assets/icon-availability.svg";
import iconCompliance from "@/assets/icon-compliance.svg";
import iconProfile from "@/assets/icon-profile.svg";
import avatarMan from "@/assets/avatar-man.png";
import avatarWoman1 from "@/assets/avatar-woman-1.png";
import avatarWoman2 from "@/assets/avatar-woman-2.png";

interface FloatingNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  image: HTMLImageElement | null;
  pulsePhase: number;
  isAvatar: boolean;
}

const ALL_IMAGE_SOURCES = [
  { src: iconIntegrations, isAvatar: false },
  { src: iconNotifications, isAvatar: false },
  { src: iconAiMatch, isAvatar: false },
  { src: iconLocation, isAvatar: false },
  { src: iconAvailability, isAvatar: false },
  { src: iconCompliance, isAvatar: false },
  { src: iconProfile, isAvatar: false },
  { src: avatarMan, isAvatar: true },
  { src: avatarWoman1, isAvatar: true },
  { src: avatarWoman2, isAvatar: true },
  { src: iconIntegrations, isAvatar: false },
  { src: iconNotifications, isAvatar: false },
  { src: iconAiMatch, isAvatar: false },
  { src: iconLocation, isAvatar: false },
  { src: iconAvailability, isAvatar: false },
  { src: iconCompliance, isAvatar: false },
  { src: iconProfile, isAvatar: false },
  { src: avatarMan, isAvatar: true },
  { src: avatarWoman1, isAvatar: true },
  { src: avatarWoman2, isAvatar: true },
];

// Use fewer nodes on mobile
const getMobileSources = () =>
  window.innerWidth < 768 ? ALL_IMAGE_SOURCES.slice(0, 8) : ALL_IMAGE_SOURCES;

const AgentNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<FloatingNode[]>([]);
  const animRef = useRef<number>(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const imagesLoaded = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    // Load ALL images upfront regardless of screen size
    const loadedImages: (HTMLImageElement | null)[] = ALL_IMAGE_SOURCES.map(() => null);
    let loaded = 0;

    ALL_IMAGE_SOURCES.forEach((item, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loadedImages[i] = img;
        loaded++;
        if (loaded === ALL_IMAGE_SOURCES.length) {
          imagesRef.current = loadedImages;
          imagesLoaded.current = true;
          initNodes();
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === ALL_IMAGE_SOURCES.length) {
          imagesRef.current = loadedImages;
          imagesLoaded.current = true;
          initNodes();
        }
      };
      img.src = item.src;
    });

    const initNodes = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const sources = getMobileSources();
      nodesRef.current = sources.map((item, i) => ({
        x: Math.random() * (w * 0.8) + w * 0.1,
        y: Math.random() * (h * 0.85) + h * 0.05,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: item.isAvatar ? 48 : 44,
        image: imagesRef.current[i] ?? null,
        pulsePhase: (i / sources.length) * Math.PI * 2,
        isAvatar: item.isAvatar,
      }));
    };

    const handleResize = () => {
      resize();
      if (imagesLoaded.current) initNodes();
    };
    window.addEventListener("resize", handleResize);

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (!imagesLoaded.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const nodes = nodesRef.current;
      const pad = 40;

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < pad || n.x > w - pad) n.vx *= -1;
        if (n.y < pad || n.y > h - pad) n.vy *= -1;
        n.x = Math.max(pad, Math.min(w - pad, n.x));
        n.y = Math.max(pad, Math.min(h - pad, n.y));
      });

      const maxDist = 320;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6, 49, 101, ${alpha * 0.08})`;
            ctx.lineWidth = 6;
            ctx.stroke();
            ctx.strokeStyle = `rgba(6, 49, 101, ${alpha * 0.15})`;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.strokeStyle = `rgba(6, 49, 101, ${alpha * 0.25})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();

            const speed = 0.0006;
            const packetProgress = (time * speed + i * 0.3 + j * 0.17) % 1;

            if (dist < 280) {
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * packetProgress;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * packetProgress;

              const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 16);
              pGrad.addColorStop(0, `rgba(6, 49, 101, ${alpha * 0.35})`);
              pGrad.addColorStop(0.5, `rgba(6, 49, 101, ${alpha * 0.1})`);
              pGrad.addColorStop(1, "transparent");
              ctx.beginPath();
              ctx.fillStyle = pGrad;
              ctx.arc(px, py, 16, 0, Math.PI * 2);
              ctx.fill();

              ctx.beginPath();
              ctx.fillStyle = `rgba(6, 49, 101, ${alpha * 0.7})`;
              ctx.arc(px, py, 3, 0, Math.PI * 2);
              ctx.fill();

              ctx.beginPath();
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(time * 0.002 + n.pulsePhase) * 0.15 + 0.85;
        const halfSize = (n.size / 2) * pulse;

        const glowGrad = ctx.createRadialGradient(n.x, n.y, halfSize, n.x, n.y, halfSize * 2.2);
        glowGrad.addColorStop(0, `rgba(6, 49, 101, ${0.06 * pulse})`);
        glowGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.fillStyle = glowGrad;
        ctx.arc(n.x, n.y, halfSize * 2.2, 0, Math.PI * 2);
        ctx.fill();

        if (n.image) {
          ctx.save();

          if (n.isAvatar) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, halfSize, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(n.image, n.x - halfSize, n.y - halfSize, halfSize * 2, halfSize * 2);
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(n.x, n.y, halfSize + 1.5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(6, 49, 101, ${0.2 * pulse})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
          } else {
            ctx.globalAlpha = pulse;
            ctx.drawImage(n.image, n.x - halfSize, n.y - halfSize, halfSize * 2, halfSize * 2);
            ctx.restore();
          }
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
    />
  );
};

export default AgentNetwork;
