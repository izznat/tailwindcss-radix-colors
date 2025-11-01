# Radix Colors for Tailwind CSS

Use [Radix Colors](https://www.radix-ui.com/colors) as Tailwind CSS theme variables.

## Installation
```bash
npm install @radix-ui/colors @izznatsir/tailwindcss-radix-colors
```

## Usage

```CSS
@import "tailwindcss";

/* If you want to disable Tailwind CSS default colors. */
@theme {
    --color-*: initial;
}

@import "@radix-ui/colors/mauve.css";
/*
If you want automatic dark theme colors. Make sure
to add "dark" or "dark-theme" class to the root element,
e.g. <html class="dark">.
*/
@import "@radix-ui/colors/mauve-dark.css";
/*
This package theme variables will reference
the CSS variables from @radix-ui/colors package.
*/
@import "@izznatsir/tailwindcss-radix-colors/mauve.css";
```
