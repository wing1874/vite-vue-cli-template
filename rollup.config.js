import terser from '@rollup/plugin-terser';

export default {
  input: 'bin/index.js',
  output: [
    {
      file: 'dist/main.mjs',
      format: 'es',
      name: 'version',
      plugins: [terser()],
    },
  ],
};
