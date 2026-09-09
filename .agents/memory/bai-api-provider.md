---
name: B.AI model compatibility
description: External B.AI API behavior relevant to the SGS AI Hub provider chain.
---

B.AI model listings can include models with different endpoint and billing eligibility. For a website chat agent, discover models from the credential, prefer currently free chat-compatible models, and keep the model override configurable. Reasoning models may return empty visible content when the completion budget is too small even though reasoning output exists; do not expose reasoning output as the user answer.

**Why:** The B.AI key was valid, but the first enabled/free model required a different endpoint or consumed its output budget in reasoning. Static model assumptions caused false provider failures.

**How to apply:** Keep B.AI server-side, use the OpenAI-compatible chat endpoint for models that advertise chat support, and treat endpoint/model errors as provider fallback conditions. Never log or return API keys.