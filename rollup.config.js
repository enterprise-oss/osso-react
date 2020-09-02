import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import { base64 } from 'rollup-plugin-base64';
import svg from 'rollup-plugin-svg';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const input = 'src/index.ts';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  '@apollo/client/utilities',
];

const plugins = [
  alias({
    entries: [{ find: '~', replacement: 'src' }],
  }),
  babel({
    exclude: 'node_modules/**',
    presets: [['env', { modules: false }], 'react'],
  }),
  base64({
    include: 'src/resources/SFMono-Regular.ttf',
  }),
  svg({ base64: true }),
  typescript({
    typescript: require('typescript'),
  }),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
    external,
  },
];
