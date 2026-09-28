# CST Owner Dashboard Playbook

This guide explains the read-only Command Center and its owner orientation tools. It is an operating aid, not permission to enable live trading or a replacement for the approved risk policy.

## Start here

1. Open the [existing Command Center](https://blissett.github.io/cst-command-center/). Keep its private view token private.
2. Confirm the intended account and Paper environment. Do not infer the account from the layout or color.
3. Read Today, the update time and the System timestamps. A refreshed page is not proof of a fresh engine scan.
4. Check positions and resting orders before reviewing another proposal.
5. Use the existing authorized phone workflow for decisions. The Command Center is a display, not an order-entry screen.

The dashboard requires your existing view token before displaying account data. The separate design preview uses fictional data; do not confuse it with this token-gated workspace.

## Find each card

| Card | Purpose | Your action |
|---|---|---|
| Today | Main status and pending-decision summary | Read this first; stop if information is missing or contradictory |
| Focus | Selected symbol, quote and basic context | Select the symbol you intend to inspect |
| Engine signal | Count of displayed strategy conditions and last verdict | Distinguish a setup from an approved order |
| Chart | Price history; extra chart detail in Detailed view | Change symbol and range; do not infer live approval from the chart |
| Engine log | Plain-language sequence of ledger events | Find the proposal, decision, submission and fill separately |
| Long-term illustration | Paper equity and a hypothetical compounding calculator | Treat sliders as illustrations, not contributions |
| Indicators | Additional measurements | Select Detailed to reveal this card |
| Portfolio strip | Equity, positions, P&L, estimated stop risk and status | Check the scope and timestamps behind each number |
| Positions and resting orders | Position and waiting-order summaries | Reconcile with actual broker records |
| Learn | Your existing strategy lessons, preserved | Historical examples and percentages do not override the current approved policy |
| Dashboard orientation | Eight short topics about this workspace | Open a topic and practice locating the relevant card |
| System | Account, engine, ledger and configuration summary | Select Detailed to reveal this card |

The [dashboard](https://blissett.github.io/cst-command-center/) hides Indicators and System cards in Plain view. They are not deleted; the new section links reveal a hidden target automatically.

## A simple daily routine

### Before a decision

- **Environment:** Confirm Paper and the expected account.
- **Freshness:** Check the latest scan, publication and verification times. Pause if the record is stale or missing.
- **Exposure:** Review positions and resting orders together.
- **Context:** Read the strategy conditions and last scan verdict, not just a colored badge.

### When a proposal arrives

Match account, symbol, side, quantity, limit, stop, target, estimated risk and expiry. If anything is unclear or inconsistent, decline or wait for clarification rather than assuming the intent.

Make the decision through the existing authorized phone workflow. Approval is not a fill; wait for the broker outcome and its corresponding record.

### After a fill

Match executed quantity and price, including partial fills. Confirm actual protective orders rather than assuming a stop displayed in a plan is working at the broker.

If a notification, broker record and ledger disagree, preserve the evidence and investigate. Do not duplicate the order to compensate for an uncertain result.

### At the end of the day

Review open positions, outstanding orders, fills and discrepancies. Record the setup, decision, outcome and lesson in your existing journal, then read one training lesson.

## Interpret the numbers carefully

- **Three conditions met:** A strategy-rule count, not a probability of profit or permission to enter.
- **Risk at stops:** A limited stop-distance estimate from displayed long stock positions with stop data, not a guaranteed maximum loss or comprehensive pending-order/options risk measure.
- **Chain check:** Evidence about linked ledger records, not independent proof of completeness, broker protection or operational readiness.
- **Long-term illustration:** A calculator using paper equity, not a consolidated Fidelity account or a funding schedule.
- **Successful execution run:** Not, by itself, proof of alert delivery, a fill or live readiness.

This guide deliberately does not prescribe a new risk percentage or replace the approved versioned policy. A preference for aggressive trading does not turn a demonstration value into a deployed limit.

## What is still separate or missing

The [inspected dashboard](https://github.com/Blissett/cst-command-center/blob/main/index.html) is not a combined Fidelity, Alpaca, IBKR and TradeStation account-management console. Its [current UI](https://github.com/Blissett/cst-command-center/blob/main/index.html) does not supply a real-account funding tracker, deposit scheduler, cross-account account selector, full trade-journal editor, options-permission setup or live-activation control.

The owner interface adds orientation, not these integrations. It also does not implement the proposed two-light market gate; the existing three-condition ring must not be relabeled as that gate.

Family onboarding remains outside this owner-first guide. No family access or broker settings were changed to create it.

## First practice session

1. Sign into the dashboard with your existing view token and press Start guided tour.
2. Use Show this card and Return to tour to visit each section.
3. Switch between Plain and Detailed and locate Indicators and System.
4. Select a different symbol and chart range.
5. Move a wealth slider and notice that it changes only an illustration.
6. Open an orientation topic, then use Open existing strategy lessons. Existing lesson checkmarks are retained in that browser when browser storage is available; they are not a cross-device training record.
7. Open each daily-playbook checklist.
8. Make decisions only through the existing authorized phone workflow after checking the current proposal and evidence.

## Change boundary

This release is UI-only: darker styling, a guided tour, section navigation, orientation topics and this playbook. It preserves the existing data-loading logic, sign-in and sign-out handlers, original lessons, broker-facing code, risk rules and scheduled workflows.

This guide does not certify current account readiness or authorize live trading. If the displayed account, environment, status or timestamps are unclear, stop and reconcile the evidence rather than relying on the interface design.
