# SWC Styled JSX Compiler

A minimal demonstration of compiling React with styled-jsx using SWC, focused on analyzing how SWC processes and flattens CSS selectors.

## Files

- `source.tsx`: The React component with styled-jsx
- `compile.tsx`: The script that compiles the React component and displays the results

## Usage

```bash
# Install dependencies
bun install

# Make the compile script executable
chmod +x compile.tsx

# Run the compile script
./compile.tsx
```

## How SWC Processes Styled JSX

This project demonstrates a bug in how the SWC compiler processes styled-jsx CSS nesting:

**Inconsistent CSS Nesting Behavior**:

SWC correctly flattens nested class selectors (`.container .inner-class`), but fails to process other nested selectors like the `div` rule inside `.container`. This creates malformed CSS that browsers can't properly interpret.

When handling the following CSS:
```css
.container {
  text: red;
  .inner-class {
    text: yellow;
  }
  div {
    text: blue;
  }
}
```

SWC produces:
```css
.container.jsx-[hash] {
  text:red;div {          text: blue;        }
}
.container.jsx-[hash] .inner-class.jsx-[hash] {
  text: yellow;
}
```

Notice how `.inner-class` was correctly flattened while the `div` selector remained nested and unprocessed.

## Configuration

The SWC configuration in the compile script:

```js
{
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: true
    },
    transform: {
      react: {
        runtime: "automatic"
      }
    },
    experimental: {
      plugins: [
        ["@swc/plugin-styled-jsx", {}]
      ]
    }
  },
  module: {
    type: "es6"
  }
}
```
