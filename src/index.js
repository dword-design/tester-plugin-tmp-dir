import withLocalTmpDir from 'with-local-tmp-dir'

export default options => ({
  transform: test =>
    function () {
      return withLocalTmpDir(() => test.call(this), options)
    },
})
