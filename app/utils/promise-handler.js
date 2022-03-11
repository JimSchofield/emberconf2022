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

  async update(args) {
    console.log('updating to search for ', args.searchTerm);

    this.value = null;
    this.error = null;

    if (this.abortController) {
      this.abortController.abort();
    }

    // Keeps previous abort controller aborts to affect next one
    await Promise.resolve();

    await this.doFetch(args.searchTerm);
  }

  async doFetch(newTerm = null) {
    this.abortController = new AbortController();

    try {
      const res = await this.promiseFunc(this.abortController.signal, newTerm);

      const data = await res.json();

      this.value = data;
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      this.error = error;
    }
  }

  destroy(ctx) {
    console.log('Destroying the fetch request!');
    ctx.abortController.abort();
  }
}
