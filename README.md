# ReScript Static

A simple ReScript static site generator.

View the [example site](https://kevanstannard.github.io/rescript-static/).

## Writing content

Start the development server:

```
npm run start
```

Then open your browser:

http://localhost:3000/

### Blog posts

Blog posts are written using Markdown in `/content/posts`.

Blog posts must have the following front matter:

```
---
title: My blog post
date: 2021-07-17 06:09:24
---
```

### Pages

Pages are written using Markdown in `/content/pages`.

Pages must have front matter with a `title`:

```
---
title: My page
---
```

Generated file names use the same name as the markdown file, however you can control the generated file name with an `id` front matter entry:

```
---
id: index
title: My page
---
```

### Code blocks

Code blocks can be written using triple back ticks.

````
```res
let x = "Hello world"
```
````

### Images

Images should be be placed in `/static/images`.

They will be copied to `/static/images` in the output directory.

You can refer to them in content pages with:

```
![My Image](static/images/my-image.jpg)
```


### Generated site

The site is generated in the `/docs` directory.

Note that the default configuration uses one directory for all output files. You just need to ensure all file names are unique.

## Development

### Templates

Templates are in `/src/templates`.

Templates are written in React.

### CSS and images

CSS and images can be placed in `/static`.

They will be copied to `/static` in the output directory.

### Main application

The main application is in `/src/App.res`.

### ReScript

To watch for ReScript changes:

```
npm run res:watch
```
