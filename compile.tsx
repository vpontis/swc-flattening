#!/usr/bin/env bun
import { transform } from '@swc/core';
import fs from 'fs';
import path from 'path';

async function compileFile() {
  const filePath = path.join(__dirname, 'source.tsx');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const output = await transform(fileContent, {
    filename: filePath,
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
  });
  
  console.log('\n🔄 Compiled JavaScript Output:');
  console.log('-----------------------------');
  console.log(output.code);
  
  // Extract and format the CSS style
  const styleRegex = /children: "([^"]+)"/;
  const match = output.code.match(styleRegex);
  
  if (match && match[1]) {
    // The raw CSS with class names
    const rawCss = match[1];
    
    // Find the classname pattern (like jsx-622ec9ade9ce74f0)
    const idMatch = output.code.match(/id: "([^"]+)"/);
    const classId = idMatch ? idMatch[1] : null;
    
    if (classId) {
      console.log('\n💅 Processed CSS:');
      console.log('---------------');
      
      // Format the original CSS with classnames for better readability
      const formattedCss = rawCss
        .split('}')
        .map(ruleset => {
          if (!ruleset.trim()) return '';
          
          const [selector, ...rest] = ruleset.split('{');
          const rules = rest.join('{');
          
          if (!rules.trim()) return '';
          
          // Check if this is a nested rule (contains unprocessed CSS)
          if (rules.includes('{')) {
            return `${selector.trim()} {\n  ${rules.trim()}\n}`;
          }
          
          const formattedRules = rules
            .split(';')
            .filter(rule => rule.trim())
            .map(rule => {
              const [prop, val] = rule.split(':');
              if (!val) return `  ${rule.trim()};`;
              return `  ${prop.trim()}: ${val.trim()};`;
            })
            .join('\n');
          
          return `${selector.trim()} {\n${formattedRules}\n}`;
        })
        .filter(Boolean)
        .join('\n\n');
      
      console.log(formattedCss);
    }
  }
}

compileFile().catch(console.error);