#!/usr/bin/env node

import { generateIconFont } from './index.js';
import path from 'path';

const [,, name, inputPath, outputPath] = process.argv;

if (!name || !inputPath || !outputPath) {
  console.error('Usage: generate-icon-font <name> <inputPath> <outputPath>');
  process.exit(1);
}

(async () => {
  try {
    const resolvedInputPath = path.resolve(process.cwd(), inputPath);
    const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

    await generateIconFont(name, resolvedInputPath, resolvedOutputPath);
    console.log('Icon font generated successfully!');
  } catch (err) {
    console.error('Error generating icon font:', err);
    process.exit(1);
  }
})();