#!/usr/bin/env node

const path = require('canonical-path');

const rollup = require('rollup');

const angular = require('rollup-plugin-angular');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');
const uglify = require('rollup-plugin-uglify-es');

async function build(input, output) {
  const bundle = await rollup.rollup(input);
  await bundle.generate(output);
  await bundle.write(output);
}

build({
  input: path.join(__dirname, 'src', 'base.ts'),
  plugins: [
    typescript(),
    resolve({
      browser: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
    uglify(),
  ],
}, {
  file: 'bundle/base.js',
  format: 'iife',
  name: 'base',
});

build({
  input: path.join(__dirname, 'src', 'vendor.ts'),
  plugins: [
    typescript(),
    resolve({
      browser: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
    uglify(),
  ],
}, {
  file: 'bundle/vendor.js',
  format: 'iife',
  name: 'vendor',
});

build({
  input: 'src/main.ts',
  external: [
    '@angular/animations',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
  ],
  plugins: [
    angular(),
    typescript(),
    resolve({
      browser: true,
      jsnext: true,
      main: true,
    }),
    uglify(),
  ],
}, {
  file: 'bundle/bundle.js',
  format: 'iife',
  globals: {
    '@angular/animations': 'vendor._ng_animations',
    '@angular/common': 'vendor._ng_common',
    '@angular/compiler': 'vendor._ng_compiler',
    '@angular/core': 'vendor._ng_core',
    '@angular/forms': 'vendor._ng_forms',
    '@angular/http': 'vendor._ng_http',
    '@angular/platform-browser': 'vendor._ng_platformBrowser',
    '@angular/platform-browser-dynamic': 'vendor._ng_platformBrowserDynamic',
    '@angular/router': 'vendor._ng_router',
  },
  sourcemap: true,
});
