import withLocalTmpDir from 'with-local-tmp-dir'

export default () => ({
  transform: test =>
    function () {
      return withLocalTmpDir(() => test.call(this))
    },
})
