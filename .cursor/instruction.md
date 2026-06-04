# Instruction

## Current Task (Epic Sprint 3: Silent Failure Fix — Catch Blocks)
Replace empty catch blocks with user-visible error handling. Follow agent swarm governance.

> In `app/sections/contact.tsx`, the `handleCopy` function has an empty catch block that silently fails when clipboard copy doesn't work. Add an `error` state to `ContactCard` alongside the existing `copied` state. When `navigator.clipboard.writeText` throws, set `error` to `true` and show a visible "Copy failed — number is selectable above" message below the copy button. Auto-clear the error after 3 seconds. Use a red/amber styled message. The `error` state should be mutually exclusive with `copied` (clear one when the other is set). Do not change any other behavior.

## Scope
- **In Scope**: `app/sections/contact.tsx` (ContactCard component)
- **Out of Scope**: Other components, data files, shared Icon component

## Dependencies
- Requires: Sprint 2 completed & pushed (confirmed)
- Blocks: Sprint 4 (Testing Infrastructure)

## Expected Output
- Error state added to ContactCard
- Visible error message shown on copy failure
- Error auto-clears after 3 seconds
- `npm run build` passes with zero errors
- Zero bugs after `/code check` and `/bug checker` iteration
