# SWC Styled JSX Compiler

A minimal demonstration of compiling React with styled-jsx using SWC.

## Files

- `source.tsx`: The React component with styled-jsx
- `compile.tsx`: The script that compiles the React component and outputs the result

## Usage

```bash
# Install dependencies
bun install

# Run the compile script
bun run compile.tsx
```

The compiled output will be displayed in the console and written to `output.js`.

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

This configuration:
1. Parses TypeScript and TSX syntax
2. Uses React automatic runtime
3. Outputs ES modules
4. Uses the @swc/plugin-styled-jsx plugin for styled-jsx processing
