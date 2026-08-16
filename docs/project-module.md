# Project Module

Follows the same structure as `leave/`: schema → types → api → query hooks → orchestrator hook → form → page. No store — server state lives in TanStack Query, UI state (drawer open, editing record) lives in `useState` inside the hook.

## Structure

```
project/
├── schema/project.schema.ts      → zod validation, source of truth for shape
├── types/index.ts                → Project entity + CreateProjectDto (inferred from schema)
├── services/project.api.ts       → raw axios calls, unwraps ApiResponse<T>
├── hooks/useProjectQueries.ts    → useQuery / useMutation wrappers
├── hooks/useProject.ts           → the one hook a page imports (data + drawer state + handlers)
├── components/project-form.tsx   → the form, built on AtomInput + FormProvider
└── pages/project.tsx             → list + Drawer wiring
```

## How data flows

1. `project-form.tsx` collects input via `AtomInput`, validated by `ProjectSchema`
2. On submit, `useProject.ts`'s `submitProject()` decides create vs update based on `editingProject`
3. That calls the matching mutation in `useProjectQueries.ts`
4. On success, the mutation invalidates the `["projects"]` query key, which refetches the list automatically
5. `pages/project.tsx` just renders whatever `useProject()` gives it — no logic of its own

## When the backend API is ready

**1. Confirm the routes match.**
`project.api.ts` currently assumes `/teams/projects` (following the `/teams/leave-categories` convention). Check the real route with backend — update all five methods in `project.api.ts` if it differs.

**2. Confirm the response shape.**
Every method assumes `ApiResponse<T>` wrapping (`response.data.data`). If the backend returns something else (e.g. paginated `{ items, total }` for the list endpoint), `getProjects()` needs a small reshape, not a rewrite of the whole file.

**3. Match field names exactly.**
`Project` in `types/index.ts` is currently a guess (`clientName`, `assignedMemberIds`, etc.). Once you see a real API response, diff it against this interface field-by-field — mismatched field names are the most common bug at this stage, and TypeScript won't catch it since the axios call is typed by assertion, not runtime validation.

**4. Replace the mock team members.**
`pages/project.tsx` hardcodes `mockTeamMembers`. Swap this for a real query — likely something like `useTeamMembersQuery()` from a shared/users module, following the same `useQuery` pattern already in `useProjectQueries.ts`.

**5. Verify `AtomInput` field types exist.**
This form uses `type="multi-select"` and `type="number"` on `AtomInput`. Confirmed types so far are `select`, `date-range`, `textarea`, `text`. Check `@frontbooth/ui`'s source for the other two before relying on them — if they don't exist yet, that's a quick addition to the shared package, not the form.

**6. Test both directions of `dateRange`.**
The schema expects `dateRange` as a `[string, string]` tuple, but the API likely stores `startDate`/`endDate` separately (matching the `leave` module's pattern). Confirm `project-form.tsx`'s reset logic (`dateRange: [data.startDate, data.endDate]`) actually matches what the backend sends back on `GET`.

**7. Remove `console.error` calls or route them to your logging setup**, once you know how errors should surface beyond the AntD `message` toast already wired in.
