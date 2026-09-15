# Phase 3.7 – Part 3 – Step 4: `*ngSwitch → @switch`

## Objective

Implement automatic migration of legacy Angular `ngSwitch` syntax to modern Angular control-flow syntax.

The transformation supports:

- `[ngSwitch] → @switch`
- `*ngSwitchCase → @case`
- `*ngSwitchDefault → @default`

---

## Legacy Angular Syntax

```html
<div [ngSwitch]="status">
  <div *ngSwitchCase="'active'">
    Active
  </div>

  <div *ngSwitchCase="'inactive'">
    Inactive
  </div>

  <div *ngSwitchDefault>
    Unknown
  </div>
</div>