# SolixDB Website

Landing page for [SolixDB](https://solixdb.com), the open-source Rust data layer for Solana and Stellar.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Bun.

## Develop

```bash
bun install
bun dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run lint` | ESLint |
| `bun run format` | Format with Prettier |
| `bun run format:check` | Check formatting |

Git hooks (Husky): `pre-commit` runs lint and format check, `pre-push` runs the build.

## Structure

```
src/
  app/            routes, layout, robots, sitemap, manifest, llms.txt
  components/     Navigation, HeroSection, HeroCta, Footer
  config/
    site.ts       name, URL, description, keywords, links (single source)
    seo.ts        page metadata, JSON-LD and llms.txt built from site.ts
```

To change copy or links that crawlers and AI assistants see, edit `src/config/site.ts`.

## License

See [LICENSE](LICENSE).
