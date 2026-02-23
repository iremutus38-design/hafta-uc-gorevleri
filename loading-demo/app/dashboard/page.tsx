import { Suspense } from "react"
import StatsPanel from "./StatsPanel"
import RecentActivity from "./RecentActivity"

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard (With Suspense)</h1>

      <RecentActivity />

      <Suspense
        fallback={
          <div style={{ marginTop: "20px" }}>
            <h3>📊 İstatistikler hazırlanıyor...</h3>
            <div style={{ background: "#ddd", height: "20px", width: "200px", marginTop: "10px" }} />
          </div>
        }
      >
        <StatsPanel />
      </Suspense>
    </div>
  )
}