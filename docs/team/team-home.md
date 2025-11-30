---
id: team-home
title: Team Portal
sidebar_label: Team Portal
slug: /
---

import React from 'react';
import TeamAuth from '@site/src/components/TeamAuth';

<TeamAuth>

# Team Workflow

## How to Update the Website

1. Get access to 47-Eagle organization
2. Clone the repository:
   ```bash
   git clone https://github.com/47-Eagle/frontend-v1.git
   cd frontend-v1
   ```
3. Make your changes and push:
   ```bash
   git add .
   git commit -m "your changes"
   git push
   ```

Website updates automatically at https://v1.47eagle.com/ in 3 minutes.

---

# Team Dashboard

---

## Project Status

**Current Phase:** Ethereum Hub Deployment

- Foundation Infrastructure: Complete
- Charm Finance Integration: Complete
- Ethereum Hub Vault: In Progress
- Security Audits: Planned
- Multi-Chain Expansion: Planned

---

## Deployment Status

[![Deploy Status](https://github.com/47-Eagle/frontend-v1/actions/workflows/deploy.yml/badge.svg)](https://github.com/47-Eagle/frontend-v1/actions/workflows/deploy.yml)

**Monitor Deployments:**
- [View All Runs](https://github.com/47-Eagle/frontend-v1/actions)
- [Latest Deployment](https://github.com/47-Eagle/frontend-v1/actions/workflows/deploy.yml)
- Live Site: [v1.47eagle.com](https://v1.47eagle.com/)

**Typical Deploy Time:** 3 minutes after push

---

## Quick Links

**GitHub:** [47-Eagle Organization](https://github.com/47-Eagle)

**Internal:**
- [CI/CD Pipeline](/dev/ci-cd-protected)
- [Deployment Guide](/dev/deployment-protected)
- [Architecture](/dev/architecture)
- [Smart Contracts](/contracts/eagle-ovault)

**Protocol Integrations:**
- [LayerZero](https://layerzero.network/)
- [Charm Finance](https://alpha.charm.fi/)
- [Uniswap V3](https://app.uniswap.org/)

---

## Live Contracts

| Contract | Address | Status |
|----------|---------|--------|
| EagleRegistry | `0x472656c76f45e8a8a63fffd32ab5888898eea91e` | Live |
| CREATE2 Factory | `0x4e59b44847b379578588920ca78fbf26c0b4956c` | Live |

**Safe Multisig Wallet:**
- Current: 1 of 3 (controlled by Akita)
- Pre-Launch: Will be updated to 3 of 4

---

## Governance

**47 Eagle Snapshot:** [snapshot.box/#/s:47eagle.com](https://snapshot.box/#/s:47eagle.com)

**WLFI Resources:**
- Governance Forum: [governance.worldlibertyfinancial.com](https://governance.worldlibertyfinancial.com/)
- Official Website: [worldlibertyfinancial.com](https://worldlibertyfinancial.com/)

---

## Team

| Member | Role | Email | Telegram |
|--------|------|-------|----------|
| AC | CEO | ceo@47eagle.com | @GhostofDeath66 |
| Akita | Lead Developer | finance@47eagle.com | @stkmaAkita |
| Slynapes | Frontend Developer | slynapes@47eagle.com | @Slynapes |
| Sir Jig | Advisor | John@47eagle.com | @SirMcPug |

**Official Channels:**
- Twitter: [@TeamEagle47](https://x.com/TeamEagle47)
- Telegram: [Eagle_community_47](https://t.me/Eagle_community_47)

**Emergency Contact:** Email + Telegram all team members

---

## Team Calendar

<iframe 
  src="https://calendar.google.com/calendar/embed?src=c_fdd6737c5ecd64d9eda706ccf3558fb20728523efcc529655803de26f5fbdd6a%40group.calendar.google.com&ctz=America%2FNew_York&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0" 
  style={{border: 0, borderRadius: '8px'}} 
  width="100%" 
  height="600" 
  frameBorder="0" 
  scrolling="no">
</iframe>

**Edit calendar:** Go to [Google Calendar](https://calendar.google.com) with your @47eagle.com account

**Track:** Team syncs, milestones, audits, launches, partner meetings

---

## Security Reminders

- Production keys secured
- Multi-sig required for mainnet
- Code reviews mandatory
- Report security issues immediately

---

*Confidential - Team members only*

</TeamAuth>