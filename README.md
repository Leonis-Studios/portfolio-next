# Hassan Shirazi — Portfolio

Game-menu style portfolio site. A bonfire sits at the center of the scene with three characters
around it (each a link — LinkedIn, GitHub, resume/CV) and a chest that opens into an RPG-style
inventory screen listing projects.

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The scene layout targets a 1920px+ viewport
(matches the original design's fixed-resolution artwork).

## Structure

- `src/components/Scene.tsx` — composes the whole scene (bonfire, characters, chest, title, letterbox bars)
- `src/components/{Bonfire,Cat,BlueGuy,BrownGuy,GreenGuy,Chest}.tsx` — individual scene pieces
- `src/lib/projects.ts` — project data shown in the chest's inventory panel
- `src/hooks/useHover.ts` — hover-state hook used for sprite swap / tooltip effects
- `public/images/` — sprites, backgrounds, and UI chrome art

## TODO

- `BlueGuy.tsx`, `BrownGuy.tsx`, `GreenGuy.tsx` each have a placeholder `href` (LinkedIn, resume/CV,
  GitHub respectively) — replace with real URLs.
