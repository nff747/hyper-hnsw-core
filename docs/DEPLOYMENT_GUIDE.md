# Production Deployment & Embed Guide // Hyper Hnsw Core

## 1. Browser Native & Web Worker Environment
Install via your preferred package manager:
```bash
npm install hyper-hnsw-core
```

```javascript
import { EngineContext } from 'hyper-hnsw-core';

const engine = new EngineContext({
  arenaSize: 32 * 1024 * 1024,
  strictMode: true
});

await engine.initialize();
```

## 2. Air-Gapped / Sovereign Deployments
Download the zero-dependency bundle or clone directly. No external registry or network access is required at runtime.
