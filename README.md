# Hassan Shirazi — Portfolio

Game-menu style portfolio site. A bonfire sits at the center of the scene with three characters
around it (GitHub and LinkedIn links, plus an About Me character sheet) and a chest that opens into an RPG-style
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
- `src/components/{Bonfire,Cat,Character,Chest,Fireflies}.tsx` — individual scene pieces (Bonfire also draws the firelight flicker and embers)
- `src/components/{InventoryModal,AboutModal}.tsx` — framed inventory screen shared by the chest and the About Me sheet
- `src/lib/characters.ts` — the three clickable characters (link, hover label, sprites)
- `src/lib/about.ts` — every text and image in the About Me sheet (portrait, stats, skills, buttons, bio)
- `src/lib/projects.ts` — project data shown in the chest's inventory panel (append to add a project)
- `public/images/` — sprites, backgrounds, and UI chrome art

## TODO

- `src/lib/characters.ts` has placeholder `href`s (GitHub, LinkedIn) and `src/lib/about.ts` has placeholder
  resume/email links and bio — replace with real ones.
