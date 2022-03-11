import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';

export default class PromiseHandler {
  @tracked value;
  @tracked error;

  constructor(promiseFunc, immediate = true) {
    this.promiseFunc = promiseFunc;

    registerDestructor(this, this.destroy);

    if (immediate) {
      this.doFetch();
    }
  }

  async doFetch() {
    this.abortController = new AbortController();

    const { signal } = this.abortController;

    try {
      const res = await this.promiseFunc({ signal });

      const data = await res.json();

      this.value = data;
    } catch (error) {
      this.error = error;
    }
  }

  destroy(ctx) {
    console.log('Destroying the fetch request!');
    ctx.abortController.abort();
  }
}
