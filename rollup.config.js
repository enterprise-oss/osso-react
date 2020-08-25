import alias from '@rollup/plugin-alias';
import { base64 } from 'rollup-plugin-base64';
import svg from 'rollup-plugin-svg';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const input = 'src/index.ts';

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

const plugins = [
  base64({
    include: ['**/*.ttf'],
  }),
  alias({
    entries: [{ find: '~', replacement: 'src' }],
  }),
  typescript({
    typescript: require('typescript'),
  }),
  svg({ base64: true }),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
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
