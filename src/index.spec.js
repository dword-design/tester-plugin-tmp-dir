import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import { execa } from 'execa'
import outputFiles from 'output-files'

import self from './index.js'

export default tester(
  {
    'before each': async () => {
      await outputFiles({
        'index.spec.js': endent`
          import tester from '@dword-design/tester'
          import P from 'path'
          import { expect } from 'expect'

          import self from '../src/index.js'

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

        `,
        'package.json': JSON.stringify({ type: 'module' }),
      })
      await execa('mocha', ['--ui', 'exports', 'index.spec.js'], {
        env: { SUITE_CWD: process.cwd() },
      })
    },
    option: async () => {
      await outputFiles({
        'index.spec.js': endent`
          import tester from '@dword-design/tester'
          import P from 'path'
          import { expect } from 'expect'

          import self from '../src/index.js'

          export default tester({
            works: async () => expect(P.basename(process.cwd()).startsWith('foo-')).toEqual(true),
          }, [self({ prefix: 'foo' })])

        `,
        'package.json': JSON.stringify({ type: 'module' }),
      })
      await execa('mocha', ['--ui', 'exports', 'index.spec.js'])
    },
    works: async () => {
      await outputFiles({
        'index.spec.js': endent`
          import tester from '@dword-design/tester'
          import P from 'path'
          import { expect } from 'expect'

          import self from '../src/index.js'

          export default tester({
            works: async () => {
              expect(P.dirname(process.cwd())).toEqual(process.env.SUITE_CWD)
              expect(P.basename(process.cwd()).startsWith('tmp-')).toEqual(true)
            },
          }, [self()])

        `,
        'package.json': JSON.stringify({ type: 'module' }),
      })
      await execa('mocha', ['--ui', 'exports', 'index.spec.js'], {
        env: { SUITE_CWD: process.cwd() },
      })
    },
  },
  [self()],
)
