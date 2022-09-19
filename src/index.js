import withLocalTmpDir from 'with-local-tmp-dir'

export default options => ({
  async afterEach() {
    await this.resetWithLocalTmpDir()
  },
  async beforeEach() {
    this.resetWithLocalTmpDir = await withLocalTmpDir(options)
  },
})
