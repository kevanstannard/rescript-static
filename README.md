# ReScript Static

A ReScript static site generator.

## Writing content

Start the development server:

```
npm run dev
```

**Blog posts** are written using Markdown in `/content/posts`.

**Pages** are written using Markdown in `/content/pages`.

**Images** may be placed in `/static`. They will be copied to `/static` in the output directory.

## Development

Templates are in `/src/templates`.

CSS and images can be placed in `/static`.

Main application is in `/src/App.res`.

To watch for ReScript changes:

```
npm run re:watch
```
