import alias from '@rollup/plugin-alias';
import svg from 'rollup-plugin-svg';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';

import pkg from './package.json';

const input = {
  index: 'src/index.ts',
  docsWriter: 'src/utils/documentationWriter/index.ts',
};

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  '@apollo/client/utilities',
];

const plugins = [
  alias({
    entries: [{ find: '~', replacement: 'src' }],
  }),
  url({
    include: ['src/resources/SFMono-Regular.ttf'],
    limit: Infinity,
  }),
  svg({ base64: true }),
];

export default [
  {
    input,
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: true,
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
      dir: 'cjs',
      format: 'cjs',
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
    input: 'src/components/OssoLogin/index.tsx',
    output: {
      file: 'umd/osso-login.js',
      format: 'umd',
      name: 'osso-login',
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
