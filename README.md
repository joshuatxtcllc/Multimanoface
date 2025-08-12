# Multimanoface
multi-agent-prod/
├─ railway.json
├─ package.json
├─ .env.example
├─ apps/
│  ├─ web/                # Vite + React UI
│  │  ├─ index.html
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ main.tsx
│  │     ├─ App.tsx
│  │     └─ components/RunPanel.tsx
│  └─ api/                # Express + TypeScript
│     ├─ package.json
│     ├─ src/
│     │  ├─ server.ts
│     │  ├─ orchestrator/
│     │  │  ├─ index.ts
│     │  │  ├─ state.ts
│     │  │  └─ routing.ts
│     │  ├─ agents/
│     │  │  ├─ planner.ts
│     │  │  ├─ researcher.ts
│     │  │  └─ executor.ts
│     │  ├─ tools/
│     │  │  ├─ search.ts        # Tavily or SerpAPI
│     │  │  ├─ fetch.ts         # node-fetch + readability
│     │  │  ├─ email.ts         # nodemailer (Gmail OAuth or SMTP)
│     │  │  ├─ calendar.ts      # Google Calendar
│     │  │  └─ notion.ts        # Notion logging
│     │  └─ llm/
│     │     └─ openai.ts
│     └─ tsconfig.json
└─ tsconfig.json
