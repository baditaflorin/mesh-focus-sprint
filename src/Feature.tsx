import { useEffect } from "react";
import {
  useFullscreen,
  useNotification,
  usePageVisibility,
  useSharedTimer,
  type MeshConfig,
  type YRoom,
} from "@baditaflorin/mesh-common";
type Props = { room: YRoom | null; config: MeshConfig };
const format = (ms: number | null) =>
  `${Math.floor((ms ?? 0) / 60_000)
    .toString()
    .padStart(2, "0")}:${Math.floor(((ms ?? 0) % 60_000) / 1_000)
    .toString()
    .padStart(2, "0")}`;
export function Feature({ room, config }: Props) {
  const timer = useSharedTimer(room, "focus-sprint", { durationMs: 25 * 60_000 });
  const fullscreen = useFullscreen();
  const visibility = usePageVisibility();
  const notification = useNotification();
  useEffect(() => {
    if (timer.state === "finished")
      notification.notify("Focus sprint complete", { body: "Time for a shared break." });
  }, [notification, timer.state]);
  return (
    <main className="feature-placeholder">
      <p className="feature-status">
        {room ? `${room.peerCount} peer(s) in this sprint` : "Connecting…"}
        {!visibility.visible ? " · paused in this tab" : ""}
      </p>
      <h1>{config.appName}</h1>
      <p>One room, one honest focus timer. The timer is shared; browser controls stay local.</p>
      <output aria-live="polite" style={{ fontSize: "4rem", fontVariantNumeric: "tabular-nums" }}>
        {format(timer.remainingMs)}
      </output>
      <p className="feature-status">{timer.state}</p>
      <div>
        <button onClick={() => timer.start()}>Start 25 minutes</button>
        {timer.state === "running" && <button onClick={timer.pause}>Pause</button>}
        {timer.state === "paused" && <button onClick={timer.resume}>Resume</button>}
        <button onClick={timer.reset}>Reset</button>
      </div>
      <div>
        <button onClick={() => void fullscreen.toggle()}>
          {fullscreen.active ? "Exit fullscreen" : "Fullscreen"}
        </button>
        {notification.permission === "default" && (
          <button onClick={() => void notification.request()}>Enable completion alert</button>
        )}
      </div>
    </main>
  );
}
