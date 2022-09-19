import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import packageName from 'depcheck-package-name'
import execa from 'execa'
import { outputFile } from 'fs-extra'

import self from '.'

export default tester(
  {
    'before each': async () => {
      await outputFile(
        'index.spec.js',
        endent`
        import tester from '@dword-design/tester'
        import P from 'path'
        import self from '../src'

        export default tester({
          works: async () => {},
        }, [
          self(),
          {
            beforeEach: () => {
              expect(P.dirname(process.cwd())).toEqual(process.env.SUITE_CWD)
              expect(P.basename(process.cwd()).startsWith('tmp-')).toEqual(true)
            }
          }
        ])

      `
      )
      await execa(
        'mocha',
        ['--ui', packageName`mocha-ui-exports-auto-describe`, 'index.spec.js'],
        { env: { SUITE_CWD: process.cwd() } }
      )
    },
    option: async () => {
      await outputFile(
        'index.spec.js',
        endent`
        import tester from '@dword-design/tester'
        import P from 'path'
        import self from '../src'

        export default tester({
          works: async () => expect(P.basename(process.cwd()).startsWith('foo-')).toEqual(true),
        }, [self({ prefix: 'foo' })])

      `
      )
      await execa('mocha', [
        '--ui',
        packageName`mocha-ui-exports-auto-describe`,
        'index.spec.js',
      ])
    },
    works: async () => {
      await outputFile(
        'index.spec.js',
        endent`
        import tester from '@dword-design/tester'
        import P from 'path'
        import self from '../src'

        export default tester({
          works: async () => {
            expect(P.dirname(process.cwd())).toEqual(process.env.SUITE_CWD)
            expect(P.basename(process.cwd()).startsWith('tmp-')).toEqual(true)
          },
        }, [self()])

      `
      )
      await execa(
        'mocha',
        ['--ui', packageName`mocha-ui-exports-auto-describe`, 'index.spec.js'],
        { env: { SUITE_CWD: process.cwd() } }
      )
    },
  },
  [self()]
)
