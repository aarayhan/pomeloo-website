"use client";
// Drag photo.heic, tap Shift, the convert wheel pops under the cursor, drop on PNG, photo.png appears.
import { motion } from "motion/react";
import { useId } from "react";
import { Cursor, FileIcon, Frame, Keycap, Win, usePhases } from ".";

const MS = [1300, 1300, 1000, 1100, 2200];
const CAPTION = [0, 0, 1, 2, 3];
const LABELS = ["PNG", "WEBP", "TIFF", "AVIF", "BMP", "PDF", "JPG"];

function sector(i: number, n: number, r0: number, r1: number) {
  const a = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const step = 360 / n;
  const [s, e] = [a(i * step - step / 2 + 1.5), a(i * step + step / 2 - 1.5)];
  const p = (r: number, t: number) => `${50 + r * Math.cos(t)} ${50 + r * Math.sin(t)}`;
  return `M ${p(r1, s)} A ${r1} ${r1} 0 0 1 ${p(r1, e)} L ${p(r0, e)} A ${r0} ${r0} 0 0 0 ${p(r0, s)} Z`;
}

/** The wheel as a soft moulded object: pillowy sectors on a rim, the picked one in tangerine. Colours come from CSS vars. */
export function WheelSvg({ hot, labels = LABELS, title = "Convert" }: { hot: number; labels?: string[]; title?: string }) {
  const n = labels.length;
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 100 100" className="size-full drop-shadow-xl">
      <defs>
        <filter id={`${id}s`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.7" stdDeviation="0.7" floodOpacity="0.18" />
        </filter>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49.5" style={{ fill: "var(--wheel-rim)" }} />
      {labels.map((l, i) => {
        const t = ((i * 360) / n - 90) * (Math.PI / 180);
        return (
          <g key={l}>
            <path
              d={sector(i, n, 20, 47)}
              filter={`url(#${id}s)`}
              style={{ fill: i === hot ? "#f35b28" : "var(--wheel-face)" }}
              className="transition-[fill] duration-200"
            />
            <path d={sector(i, n, 20, 47)} fill={`url(#${id}g)`} />
            <text
              x={50 + 33.5 * Math.cos(t)}
              y={50 + 33.5 * Math.sin(t) + 1.5}
              textAnchor="middle"
              fontSize={l.length > 6 ? 3.4 : 4.3}
              fontWeight="600"
              style={{ fill: i === hot ? "#fff" : "var(--wheel-ink)" }}
            >
              {l}
            </text>
          </g>
        );
      })}
      <circle cx="50" cy="50" r="17" filter={`url(#${id}s)`} style={{ fill: "var(--wheel-face)" }} />
      <text x="50" y="49" textAnchor="middle" fontSize="4.6" fontWeight="600" style={{ fill: "var(--wheel-ink)" }}>
        {title}
      </text>
      <text x="50" y="55" textAnchor="middle" fontSize="3.3" fill="#8a8f89">
        1 file
      </text>
    </svg>
  );
}

export default function WheelDemo({ captions, replayLabel, label }: { captions: string[]; replayLabel: string; label: string }) {
  const { ref, phase, replay } = usePhases(MS);
  const at = [
    [18, 40],
    [64, 50],
    [64, 50],
    [64, 31],
    [64, 31],
  ][phase];
  const dragging = phase >= 1 && phase <= 3;
  const wheel = phase === 2 || phase === 3;
  return (
    <Frame frameRef={ref} captions={captions} step={CAPTION[phase]} replay={replay} replayLabel={replayLabel} label={label}>
      <Win title="Pictures" className="top-[10%] left-[5%] h-[62%] w-[36%]">
        <div className="flex gap-3 p-4">
          <FileIcon name="photo.heic" className={dragging ? "opacity-40" : ""} />
          <motion.div initial={false} animate={{ opacity: phase === 4 ? 1 : 0, scale: phase === 4 ? 1 : 0.6 }}>
            <FileIcon name="photo.png" />
          </motion.div>
        </div>
      </Win>
      <motion.div
        className="absolute z-20 w-[34%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: "64%", top: "50%", aspectRatio: "1" }}
        initial={false}
        animate={{ scale: wheel ? 1 : 0.3, opacity: wheel ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <WheelSvg hot={phase === 3 ? 0 : -1} />
      </motion.div>
      {dragging && (
        <motion.div
          className="absolute z-20 opacity-80"
          initial={false}
          animate={{ left: `${at[0] + 1}%`, top: `${at[1] + 3}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        >
          <FileIcon name="photo.heic" className="scale-75" />
        </motion.div>
      )}
      <Cursor x={at[0]} y={at[1]} grab={dragging} />
      <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2" style={{ opacity: phase >= 1 && phase <= 3 ? 1 : 0.25 }}>
        <Keycap down={phase === 2}>Shift</Keycap>
      </div>
    </Frame>
  );
}
