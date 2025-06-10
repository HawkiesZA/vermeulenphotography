# Welcome to Vermeulen Photography!

This is the repository for the website of Vermeulen Photography.

## Quickstart

1. Fork this project to your own repository, and clone it to your local machine
2. Install all necessary packages with `npm install`
3. Run `npm run dev` to start the dev server
4. Now you can setup the site to your liking!
5. Update the site URL in `astro.config.mjs` and `/public/robots.txt` to match your domain
6. After you're happy, update your changes to your repo and deploy to the provider of your choice!

## Code Intro

The source files have the following setup. Note that not all files are listed here.

```
.
├── .tours/
│   └── code-intro.tour
├── public/
│   ├── favicons/
│   │   └── favicon.ico
│   ├── images/
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── site-logo.png
│   ├── components/
│   │   └── Hero/
│   │       └── Hero.astro
│   ├── config/
│   │   └── navData.json.ts
│   ├── data/
│   │   ├── portfolios/
│   │   ├── testimonials/
│   │   └──otherPages/
│   │    config.ts
│   ├── js/
│   │   └── textUtils.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── portfolio/
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   ├── [page].astro
│   │   ├── 404.astro
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── .gitignore
├── .prettierrc.mjs
├── astro.config.mjs
├── netlify.toml
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

For robots like Google to see the correct sitemap, you will want to edit the `public/robots.txt` file to use your website domain.

## License

This project is open source and available under the [GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html).

## General Astro Info

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory. I also frequently use `src/assets` for images when using Astro asssets for image optimization.

### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Deployment

This repo has been set up to automatically deploy when you push to the main branch.
