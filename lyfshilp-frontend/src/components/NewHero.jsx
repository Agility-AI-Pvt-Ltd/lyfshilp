import { useEffect, useRef } from "react";

/* ─── Globe data ────────────────────────────────────────────────────────── */
const CONTINENTS = {
  northAmerica: [
    [71,-156],[70,-145],[69,-140],[68,-137],[68,-132],[66,-130],[63,-125],[60,-125],[57,-136],[55,-130],[53,-128],[50,-125],[48,-124],[45,-124],[40,-124],[36,-122],[32,-117],[28,-110],[25,-105],[22,-105],[20,-103],[20,-98],[18,-92],[16,-90],[15,-88],[10,-83],[8,-77],[8,-75],[10,-75],[12,-70],[14,-61],[18,-66],[23,-82],[25,-80],[28,-80],[30,-81],[32,-80],[35,-76],[37,-76],[38,-75],[40,-74],[41,-70],[43,-70],[44,-66],[45,-64],[46,-60],[47,-53],[50,-56],[52,-55],[54,-57],[56,-62],[58,-65],[60,-65],[62,-68],[64,-72],[66,-73],[68,-76],[68,-80],[68,-85],[67,-87],[67,-92],[66,-96],[66,-100],[67,-105],[69,-108],[70,-112],[70,-116],[70,-120],[70,-128],[70,-136],[71,-142],[71,-148],[71,-152],[71,-156],
  ],
  greenland: [
    [76,-70],[76,-60],[75,-48],[74,-40],[72,-28],[70,-24],[68,-26],[66,-36],[64,-42],[64,-52],[65,-60],[68,-66],[70,-70],[72,-72],[74,-70],[76,-70],
  ],
  southAmerica: [
    [12,-72],[11,-73],[8,-77],[6,-77],[4,-74],[2,-72],[0,-70],[-1,-70],[-2,-68],[-4,-70],[-6,-72],[-8,-75],[-10,-76],[-12,-77],[-14,-77],[-16,-73],[-18,-70],[-20,-70],[-21,-70],[-22,-68],[-24,-70],[-26,-70],[-28,-70],[-30,-72],[-32,-72],[-34,-72],[-36,-73],[-38,-73],[-40,-72],[-42,-73],[-44,-66],[-46,-67],[-48,-66],[-50,-68],[-52,-69],[-54,-68],[-55,-64],[-54,-58],[-52,-58],[-50,-56],[-48,-52],[-46,-48],[-44,-44],[-42,-40],[-38,-38],[-34,-36],[-30,-50],[-28,-50],[-26,-48],[-24,-44],[-22,-42],[-20,-40],[-18,-40],[-16,-38],[-14,-38],[-12,-38],[-10,-37],[-8,-36],[-6,-35],[-4,-36],[-2,-40],[0,-50],[2,-52],[4,-52],[6,-58],[8,-60],[10,-62],[12,-72],
  ],
  europe: [
    [36,9],[36,14],[38,16],[38,22],[40,24],[41,26],[42,28],[42,26],[44,28],[45,30],[46,30],[47,24],[48,18],[50,14],[52,14],[54,18],[54,22],[56,24],[57,22],[58,16],[58,10],[57,8],[56,8],[55,8],[54,8],[54,10],[53,8],[52,4],[51,2],[50,2],[49,0],[48,2],[46,4],[44,6],[43,6],[43,4],[42,2],[41,2],[40,0],[39,0],[38,0],[37,2],[36,4],[36,6],[36,9],
  ],
  scandinavia: [
    [56,10],[57,10],[58,8],[59,5],[60,5],[61,4],[62,5],[63,8],[64,10],[65,14],[66,16],[67,14],[68,16],[69,18],[70,20],[71,24],[71,28],[70,28],[69,30],[68,28],[67,28],[66,26],[65,28],[64,26],[63,24],[62,22],[61,20],[60,18],[59,18],[58,16],[57,14],[56,12],[56,10],
  ],
  uk: [
    [50,0],[51,-4],[52,-4],[53,-4],[54,-4],[54,-2],[55,0],[56,0],[57,-2],[58,-4],[58,-6],[57,-6],[56,-6],[55,-6],[54,-4],[53,-4],[52,-2],[51,0],[50,0],
  ],
  africa: [
    [37,10],[37,12],[36,14],[34,18],[32,26],[30,32],[26,36],[22,38],[18,40],[14,42],[12,44],[10,44],[8,42],[4,40],[2,42],[0,44],[-2,42],[-4,40],[-6,40],[-8,40],[-10,40],[-12,38],[-14,36],[-16,34],[-18,36],[-20,36],[-22,34],[-24,34],[-26,34],[-28,32],[-30,30],[-32,28],[-34,26],[-34,22],[-34,18],[-32,18],[-30,17],[-28,16],[-24,14],[-20,14],[-16,14],[-12,14],[-8,14],[-4,12],[0,10],[4,10],[8,10],[12,14],[14,16],[14,14],[16,14],[18,16],[18,12],[16,10],[14,8],[12,4],[10,2],[8,2],[6,2],[4,4],[2,6],[0,8],[-2,8],[0,6],[2,4],[4,2],[6,0],[8,0],[10,0],[12,2],[14,4],[16,2],[18,0],[20,0],[22,2],[24,4],[26,4],[28,4],[30,6],[32,10],[34,10],[36,10],[37,10],
  ],
  asia: [
    [70,32],[70,40],[68,44],[66,46],[64,48],[62,50],[60,50],[58,54],[56,56],[56,60],[54,62],[52,62],[50,60],[48,58],[46,62],[44,64],[42,68],[40,66],[38,62],[36,58],[34,56],[32,50],[30,48],[28,50],[26,56],[24,60],[22,64],[20,66],[18,66],[16,74],[14,74],[12,76],[10,78],[8,80],[8,78],[10,76],[12,74],[14,72],[16,72],[18,70],[20,70],[22,70],[24,68],[26,66],[28,62],[30,58],[28,56],[26,56],[24,54],[22,54],[20,56],[18,62],[16,64],[14,68],[12,68],[10,70],[8,76],[6,78],[4,76],[2,74],[0,72],[2,70],[4,68],[6,66],[8,64],[10,62],[12,60],[14,58],[16,56],[18,54],[20,52],[22,50],[24,50],[26,52],[28,56],[30,60],[32,58],[34,60],[36,62],[38,64],[40,62],[42,60],[44,58],[46,56],[48,54],[50,52],[52,52],[54,54],[56,58],[58,60],[60,58],[62,56],[64,52],[66,50],[68,46],[70,42],[70,50],[70,60],[70,70],[68,74],[66,76],[64,78],[62,82],[60,86],[58,90],[56,92],[54,92],[52,88],[50,86],[48,84],[46,82],[44,82],[42,80],[40,78],[38,78],[36,76],[34,74],[32,74],[30,76],[28,78],[26,80],[24,82],[22,88],[20,88],[18,92],[16,96],[14,100],[12,100],[10,100],[8,98],[6,100],[4,102],[2,104],[0,104],[2,108],[4,110],[6,108],[8,106],[10,104],[12,102],[14,100],[16,100],[18,102],[20,104],[22,108],[24,110],[26,110],[28,112],[30,114],[32,116],[34,118],[36,120],[38,120],[40,118],[42,120],[44,122],[46,124],[48,128],[50,130],[52,132],[54,136],[56,138],[58,140],[60,140],[62,138],[64,136],[66,132],[68,128],[70,124],[70,128],[70,132],[70,136],[70,140],[68,142],[66,142],[64,142],[62,142],[60,142],[58,140],[56,138],[54,136],[52,134],[50,132],[48,130],[46,126],[44,122],[42,118],[40,116],[38,120],[36,122],[34,120],[32,118],[30,120],[28,118],[26,116],[24,112],[22,108],[20,104],[18,100],[16,100],[14,102],[12,104],[10,102],[8,100],[6,100],[4,102],[2,104],[0,106],[2,108],[4,110],[6,108],[8,106],[10,100],[12,98],[14,96],[16,92],[18,90],[20,88],[22,84],[24,80],[26,78],[28,76],[30,72],[32,70],[34,68],[36,64],[38,62],[40,60],[42,58],[44,56],[46,54],[48,52],[50,50],[52,50],[54,52],[56,54],[58,56],[60,54],[62,52],[64,50],[66,48],[68,46],[70,40],[70,36],[70,32],
  ],
  japan: [
    [31,130],[32,130],[33,131],[34,132],[35,134],[36,136],[37,137],[38,138],[39,140],[40,140],[41,141],[42,141],[43,144],[44,145],[43,143],[42,141],[41,140],[40,140],[39,138],[38,136],[37,135],[36,134],[35,132],[34,130],[33,129],[32,128],[31,130],
  ],
  oceania: [
    [-14,126],[-14,132],[-14,136],[-14,140],[-15,142],[-16,144],[-18,146],[-20,148],[-22,149],[-24,150],[-26,152],[-28,153],[-30,152],[-32,152],[-34,150],[-36,150],[-38,148],[-38,146],[-37,144],[-36,142],[-34,140],[-32,137],[-32,134],[-32,132],[-32,128],[-30,116],[-28,114],[-26,114],[-24,114],[-22,114],[-20,116],[-18,122],[-16,124],[-14,126],
  ],
  newZealand: [
    [-34,172],[-36,174],[-38,176],[-40,176],[-42,172],[-44,170],[-46,168],[-46,170],[-44,172],[-42,174],[-40,175],[-38,175],[-36,174],[-34,172],
  ],
};

const NODES = [
  [40.7, -74.0, "NY"], [51.5, -0.1, "LDN"], [35.6, 139.7, "TKY"],
  [28.6, 77.2, "DEL"], [-33.9, 18.4, "CPT"], [55.7, 37.6, "MSC"],
  [1.3, 103.8, "SIN"], [19.4, -99.1, "MXC"], [48.8, 2.3, "PAR"],
  [-23.5, -46.6, "SAO"], [31.2, 121.5, "SHA"], [37.6, 55.0, "THR"],
  [25.2, 55.3, "DXB"], [22.3, 114.2, "HKG"], [37.5, 127.0, "SEL"],
  [59.9, 30.3, "SPB"], [41.0, 28.9, "IST"], [-34.6, -58.4, "BUE"],
];

const CONNECTIONS = [
  [0,1],[0,7],[0,9],[1,4],[1,8],[1,11],[2,3],[2,6],[2,13],[2,14],
  [3,6],[3,12],[4,5],[5,11],[6,13],[7,9],[8,4],[10,13],[12,13],
  [14,10],[15,5],[16,1],[16,5],[0,8],[3,12],[12,16],
];

/* ─── Globe canvas component ────────────────────────────────────────────── */
function Globe() {
  const canvasRef = useRef(null);
  const animRef   = useRef(0);
  const rotRef    = useRef(0);
  const timeRef   = useRef(0);
  const pulsesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, R = W * 0.41;

    pulsesRef.current = CONNECTIONS.map(() => ({
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
      active: Math.random() > 0.35,
    }));

    function project(lat, lon, rot) {
      const phi = (lat * Math.PI) / 180;
      const lam = ((lon + rot) * Math.PI) / 180;
      const x = R * Math.cos(phi) * Math.sin(lam);
      const y = -R * Math.sin(phi);
      const z = R * Math.cos(phi) * Math.cos(lam);
      return { x: cx + x, y: cy + y, z, visible: z > -R * 0.08 };
    }

    function drawContinent(pts, rot, alpha) {
      const projected = pts.map(([lat, lon]) => project(lat, lon, rot));
      ctx.beginPath();
      let inRun = false;
      for (const p of projected) {
        if (p.visible) {
          if (!inRun) { ctx.moveTo(p.x, p.y); inRun = true; }
          else ctx.lineTo(p.x, p.y);
        } else { inRun = false; }
      }
      ctx.fillStyle = `rgba(30,95,60,${(alpha * 0.82).toFixed(3)})`;
      ctx.fill();

      inRun = false;
      for (let i = 0; i <= projected.length; i++) {
        const p = i < projected.length ? projected[i] : null;
        if (p && p.visible) {
          if (!inRun) { ctx.beginPath(); ctx.moveTo(p.x, p.y); inRun = true; }
          else ctx.lineTo(p.x, p.y);
        } else if (inRun) {
          ctx.strokeStyle = `rgba(212,180,104,${(alpha * 0.4).toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
          inRun = false;
        }
      }
    }

    function continentDepth(pts, rot) {
      let visCount = 0, sumZ = 0;
      for (const [lat, lon] of pts) {
        const { z } = project(lat, lon, rot);
        if (z > 0) { sumZ += z; visCount++; }
      }
      return visCount === 0 ? null : sumZ / visCount;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const rot = rotRef.current;
      timeRef.current += 0.01;

      // Outer glow
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2, 0, Math.PI * 2);
      ctx.clip();
      const og = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.6);
      og.addColorStop(0, "rgba(30,92,58,0)");
      og.addColorStop(0.5, "rgba(20,70,42,0.18)");
      og.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = og;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Globe base
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const bg = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.28, R * 0.05, cx, cy, R);
      bg.addColorStop(0, "#1e5c3a");
      bg.addColorStop(0.3, "#163d28");
      bg.addColorStop(0.7, "#0f2a1c");
      bg.addColorStop(1, "#0a1e14");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 10) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon < 360; lon += 2) {
          const p = project(lat, lon, rot);
          if (!p.visible) { first = true; continue; }
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = lat === 0 ? "rgba(212,180,104,0.22)" : "rgba(140,175,120,0.07)";
        ctx.lineWidth = lat === 0 ? 1 : 0.5;
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 360; lon += 10) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = project(lat, lon, rot);
          if (!p.visible) { first = true; continue; }
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(140,175,120,0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Continents
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      for (const pts of Object.values(CONTINENTS)) {
        const rawZ = continentDepth(pts, rot);
        if (rawZ === null) continue;
        const alpha = Math.min(1, (rawZ / R) * 1.5 + 0.15);
        drawContinent(pts, rot, alpha);
      }
      ctx.restore();

      // Projected nodes
      const proj = NODES.map(([lat, lon]) => project(lat, lon, rot));

      // Connections + pulses
      CONNECTIONS.forEach(([a, b], idx) => {
        const pa = proj[a], pb = proj[b];
        if (!pa.visible || !pb.visible) return;
        if ((pa.z + pb.z) / 2 < 0) return;
        const cpX = (pa.x + pb.x) / 2;
        const cpY = (pa.y + pb.y) / 2 - Math.hypot(pa.x - pb.x, pa.y - pb.y) * 0.22;

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(cpX, cpY, pb.x, pb.y);
        ctx.strokeStyle = "rgba(212,180,104,0.08)";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(cpX, cpY, pb.x, pb.y);
        ctx.strokeStyle = "rgba(212,180,104,0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const pulse = pulsesRef.current[idx];
        if (pulse?.active) {
          pulse.t = (pulse.t + pulse.speed) % 1;
          const t = pulse.t;
          const px = (1-t)*(1-t)*pa.x + 2*(1-t)*t*cpX + t*t*pb.x;
          const py = (1-t)*(1-t)*pa.y + 2*(1-t)*t*cpY + t*t*pb.y;

          const pb2 = ctx.createRadialGradient(px, py, 0, px, py, 16);
          pb2.addColorStop(0, "rgba(255,210,100,0.35)");
          pb2.addColorStop(1, "rgba(255,210,100,0)");
          ctx.beginPath(); ctx.arc(px, py, 16, 0, Math.PI * 2);
          ctx.fillStyle = pb2; ctx.fill();

          const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
          pg.addColorStop(0, "rgba(255,225,130,1)");
          pg.addColorStop(0.5, "rgba(220,185,100,0.7)");
          pg.addColorStop(1, "rgba(198,167,94,0)");
          ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = pg; ctx.fill();

          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#fff8e0"; ctx.fill();
        }
      });

      // Node dots + ping rings + labels
      proj.forEach((p, i) => {
        if (!p.visible) return;
        const depth = Math.max(0, p.z / R);

        const bloom = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 22);
        bloom.addColorStop(0, `rgba(255,210,100,${0.28 * depth})`);
        bloom.addColorStop(1, "rgba(255,210,100,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = bloom; ctx.fill();

        const pingT = (timeRef.current * 0.5 + i * 0.37) % 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 5 + pingT * 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,210,100,${(1 - pingT) * 0.7 * depth})`;
        ctx.lineWidth = 1.2; ctx.stroke();

        const pingT2 = (pingT + 0.5) % 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 5 + pingT2 * 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,180,104,${(1 - pingT2) * 0.35 * depth})`;
        ctx.lineWidth = 0.7; ctx.stroke();

        const ng = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14);
        ng.addColorStop(0, `rgba(255,225,130,${depth})`);
        ng.addColorStop(0.5, `rgba(212,180,104,${0.6 * depth})`);
        ng.addColorStop(1, "rgba(198,167,94,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = ng; ctx.fill();

        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,200,${depth})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${depth})`; ctx.fill();

        if (depth > 0.2) {
          ctx.font = "600 9px 'DM Sans', sans-serif";
          ctx.fillStyle = `rgba(0,0,0,${0.5 * depth})`;
          ctx.fillText(NODES[i][2], p.x + 6, p.y - 3);
          ctx.fillStyle = `rgba(255,230,150,${Math.min(1, depth * 1.6)})`;
          ctx.fillText(NODES[i][2], p.x + 5, p.y - 4);
        }
      });

      // Atmosphere rim
      const atm = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.08);
      atm.addColorStop(0, "rgba(14,59,46,0)");
      atm.addColorStop(0.5, "rgba(10,55,35,0.18)");
      atm.addColorStop(1, "rgba(0,20,12,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = atm; ctx.fill();

      // Specular highlight
      const spec = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.2, cy - R * 0.2, R * 0.6);
      spec.addColorStop(0, "rgba(255,255,255,0.07)");
      spec.addColorStop(0.5, "rgba(255,255,255,0.02)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip(); ctx.fillStyle = spec; ctx.fillRect(0, 0, W, H); ctx.restore();

      // Globe border
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212,180,104,0.08)"; ctx.lineWidth = 8; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212,180,104,0.45)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,235,160,0.2)"; ctx.lineWidth = 0.5; ctx.stroke();

      // Orbit ring 1
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(0.45); ctx.scale(1, 0.28);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212,180,104,0.65)"; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, R * 1.18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212,180,104,0.14)"; ctx.lineWidth = 8; ctx.stroke();
      ctx.restore();

      // Orbit ring 2
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.25); ctx.scale(0.28, 1);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.22, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212,180,104,0.4)"; ctx.lineWidth = 0.9; ctx.stroke();
      ctx.restore();

      // Orbit ring 3 — dashed
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(1.0); ctx.scale(1, 0.45);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.28, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(180,210,160,0.28)"; ctx.lineWidth = 0.7;
      ctx.setLineDash([5, 10]); ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();

      // Satellite 1
      const t1 = timeRef.current * 0.55;
      const s1x = cx + Math.cos(t1) * R * 1.18 * Math.cos(0.45) - Math.sin(t1) * R * 1.18 * 0.28 * Math.sin(0.45);
      const s1y = cy + Math.cos(t1) * R * 1.18 * Math.sin(0.45) + Math.sin(t1) * R * 1.18 * 0.28 * Math.cos(0.45);
      const sg1b = ctx.createRadialGradient(s1x, s1y, 0, s1x, s1y, 18);
      sg1b.addColorStop(0, "rgba(255,225,130,0.4)"); sg1b.addColorStop(1, "rgba(255,225,130,0)");
      ctx.beginPath(); ctx.arc(s1x, s1y, 18, 0, Math.PI * 2); ctx.fillStyle = sg1b; ctx.fill();
      const sg1 = ctx.createRadialGradient(s1x, s1y, 0, s1x, s1y, 9);
      sg1.addColorStop(0, "rgba(255,245,180,1)"); sg1.addColorStop(0.5, "rgba(212,180,104,0.8)"); sg1.addColorStop(1, "rgba(198,167,94,0)");
      ctx.beginPath(); ctx.arc(s1x, s1y, 9, 0, Math.PI * 2); ctx.fillStyle = sg1; ctx.fill();
      ctx.beginPath(); ctx.arc(s1x, s1y, 2.5, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();

      // Satellite 2
      const t2 = timeRef.current * 0.38 + Math.PI;
      const s2x = cx + Math.cos(t2) * R * 1.22 * 0.28 * Math.cos(-0.25) - Math.sin(t2) * R * 1.22 * Math.sin(-0.25);
      const s2y = cy + Math.cos(t2) * R * 1.22 * 0.28 * Math.sin(-0.25) + Math.sin(t2) * R * 1.22 * Math.cos(-0.25);
      const sg2b = ctx.createRadialGradient(s2x, s2y, 0, s2x, s2y, 14);
      sg2b.addColorStop(0, "rgba(180,230,180,0.35)"); sg2b.addColorStop(1, "rgba(163,177,138,0)");
      ctx.beginPath(); ctx.arc(s2x, s2y, 14, 0, Math.PI * 2); ctx.fillStyle = sg2b; ctx.fill();
      const sg2 = ctx.createRadialGradient(s2x, s2y, 0, s2x, s2y, 7);
      sg2.addColorStop(0, "rgba(200,240,200,1)"); sg2.addColorStop(0.5, "rgba(163,177,138,0.8)"); sg2.addColorStop(1, "rgba(163,177,138,0)");
      ctx.beginPath(); ctx.arc(s2x, s2y, 7, 0, Math.PI * 2); ctx.fillStyle = sg2; ctx.fill();
      ctx.beginPath(); ctx.arc(s2x, s2y, 2, 0, Math.PI * 2); ctx.fillStyle = "#e8f0e0"; ctx.fill();

      rotRef.current += 0.11;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={580}
      height={580}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  );
}

/* ─── Hero component ────────────────────────────────────────────────────── */
export default function NewHero() {
  const credibilityItems = [
    "MIT Sloan + Stanford GSB",
    "Incubated at IIIT Allahabad",
    "DPIIT Recognised",
    "38 Institutions",
    "6,000+ Students",
    "NEP 2020 Aligned",
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg,#061510 0%,#0d3d2f 45%,#1a5c46 100%)",
      }}
    >
      {/* ── Background layers ── */}
      <div className="grid-bg absolute inset-0 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 55%,rgba(0,200,150,.12) 0%,transparent 45%),radial-gradient(circle at 80% 20%,rgba(212,175,55,.07) 0%,transparent 38%),radial-gradient(circle at 65% 80%,rgba(0,200,150,.06) 0%,transparent 40%)",
        }}
      />

      {/* ── Globe — absolute, centered behind content ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          /* Centre on the viewport, nudged down slightly to clear the nav */
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -44%)",
          /* Size: big enough to dominate the hero without bleeding too far */
          width: "min(760px, 92vw)",
          /* Use flex so the canvas (maxWidth 580) truly centres inside */
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          opacity: 0.6,
        }}
      >
        {/* Radial glow halo */}
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            background: "radial-gradient(circle, rgba(0,200,150,.2) 0%, transparent 60%)",
            filter: "blur(36px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <Globe />
        </div>
      </div>

      {/* Dark vignette so text stays readable over the globe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, transparent 30%, rgba(6,21,16,.82) 100%)",
          zIndex: 2,
        }}
      />

      {/* Floating rings */}
      <div
        className="floating absolute pointer-events-none"
        style={{ right: 60, top: 100, width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(0,200,150,.08)", zIndex: 1 }}
      />
      <div
        className="floating2 absolute pointer-events-none"
        style={{ right: 120, top: 170, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(0,200,150,.06)", zIndex: 1 }}
      />
      <div
        className="floating absolute pointer-events-none"
        style={{ left: 30, bottom: 100, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(212,175,55,.06)", zIndex: 1 }}
      />

      {/* ── Foreground content — centered, full-width ── */}
      <div
        className="w-full px-6"
        style={{
          paddingTop: 120,
          paddingBottom: 96,
          position: "relative",
          zIndex: 3,
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="w-full text-center">
          {/* Badge */}
          <div
            className="ha1 inline-flex items-center gap-2 mb-8"
            style={{
              background: "rgba(0,200,150,.11)",
              border: "1px solid rgba(0,200,150,.28)",
              color: "#00c896",
              padding: "6px 18px",
              borderRadius: 50,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".75rem",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            <span
              className="pulse-dot"
              style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#00c896" }}
            />
            Global Standards · International Impact
          </div>

          {/* Headline */}
          <h1
            className="ha2 mt-[5%]"
            style={{
              fontSize: "clamp(2.8rem,6vw,5.4rem)",
              color: "#fff",
              fontWeight: 900,
              lineHeight: 1.04,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Build with AI. Think with AI. <br />
            Become someone the old <br />
            world couldn't imagine.
          </h1>

          {/* Sub-copy */}
          <p
            className="ha4"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: "rgba(255,255,255,.5)",
              fontSize: "1rem",
              lineHeight: 1.8,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            The world without AI no longer exists. This is how you thrive in the
            one that does.
          </p>

          {/* Credibility pills */}
          <div
            className="ha4"
            style={{ width: "100%", zIndex: 3, padding: "14px 18px", marginBottom: 32 }}
          >
            <div
              className="flex flex-wrap items-center justify-center gap-3"
              style={{ maxWidth: 1300, margin: "0 auto" }}
            >
              {credibilityItems.map((item, index) => (
                <div
                  key={item}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 14px",
                    borderRadius: 999,
                    background: "rgba(0,200,150,.14)",
                    border: "1px solid rgba(0,200,150,.34)",
                    color: "#fff",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".82rem",
                    fontWeight: index < 2 ? 700 : 600,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {index < 2 && (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#00c896",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="ha4 flex flex-wrap justify-center gap-4 mb-14">
            <a
              href="#contact"
              className="shimmer-btn px-8 py-4 text-sm"
              style={{ textDecoration: "none", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".4px" }}
            >
              Apply for Fellowship →
            </a>
            <a
              href="#about"
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,.25)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 50,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "border-color .3s,color .3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00c896"; e.currentTarget.style.color = "#00c896"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.color = "#fff"; }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-bounce absolute flex flex-col items-center gap-2"
        style={{ bottom: 88, left: "50%", transform: "translateX(-50%)", zIndex: 4 }}
      >
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".68rem",
            color: "rgba(255,255,255,.3)",
            letterSpacing: "2px",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom,rgba(0,200,150,.6),transparent)",
            borderRadius: 1,
          }}
        />
      </div>
    </section>
  );
}
