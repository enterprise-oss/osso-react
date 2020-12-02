import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import svg from 'rollup-plugin-svg';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const input = 'src/index.ts';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  '@apollo/client/utilities',
];

const plugins = [
  nodeResolve({ browser: true }),
  alias({
    entries: [{ find: '~', replacement: 'src' }],
  }),
  svg({ base64: true }),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      ...plugins,
      typescript({
        typescript: require('typescript'),
      }),
    ],
    external,
  },
  {
    input,
    output: {
      file: 'umd/osso.js',
      format: 'umd',
      name: 'osso',
    },
    plugins: [
      ...plugins,
      typescript({
        typescript: require('typescript'),
        useTsconfigDeclarationDir: true,
      }),
      terser(),
    ],
    external,
  },
];
