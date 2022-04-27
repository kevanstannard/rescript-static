@react.component
let make = (~title, ~children) => {
  <html>
    <head>
      <title> {React.string(title)} </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
      <link rel="icon" type_="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
      <link rel="icon" type_="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css"
      />
      <link rel="stylesheet" href="static/styles/styles.css" />
    </head>
    <body> <div className="container"> {children} </div> </body>
  </html>
}
