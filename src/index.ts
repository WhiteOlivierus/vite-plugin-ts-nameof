import tsNameof from '@typescript-nameof/nameof';
import type { Plugin } from 'vite';

export default (): Plugin => ({
  name: 'vite-plugin-ts-nameof',
  enforce: 'pre',
  transform(code, id) {
    if (/\.(vue|[mc]?ts)/i.test(id) && code.includes('nameof')) {
      const { fileText, replaced } = tsNameof.replaceInText(id, code);
      if (replaced) {
        code = fileText ?? code;
      }
    }

    return {
      code,
      map: null, // Prevent missing sourcemap warning
    };
  },
});
