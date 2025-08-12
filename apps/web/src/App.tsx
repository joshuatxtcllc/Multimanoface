import { useState } from "react";

export default function App() {
  const [objective, setObjective] = useState("Find 10 Houston venues that host rotating art and email them a 3-line pitch for Jay’s Frames - Reinvented.");
  const [result, setResult] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    const r = await fetch(import.meta.env.VITE_API_URL + "/api/run", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ objective, audience:"venue managers in Houston", location:"Houston, TX" })
    });
    setResult(await r.json());
    setBusy(false);
  }

  return (
    <div style={{maxWidth:900, margin:"40px auto", fontFamily:"system-ui"}}>
      <h1>Multi‑Agent Runner</h1>
      <textarea rows={5} value={objective} onChange={e=>setObjective(e.target.value)} style={{width:"100%"}}/>
      <button disabled={busy} onClick={run}>{busy ? "Running..." : "Run"}</button>
      {result && <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
