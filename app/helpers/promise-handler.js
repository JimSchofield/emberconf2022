import { tracked } from '@glimmer/tracking';
import { Resource } from 'ember-could-get-used-to-this';

export default class PromiseHandler extends Resource {
  @tracked value;

  setup() {
    this.doPromise();
  }

  async doPromise() {
    const abortController = new AbortController();

    this.abortController = abortController;

    try {
      const result = await this.args.named.promise(
        this.args.named.searchTerm,
        abortController.signal
      );

      const data = await result.json();

      this.value = data;
    } catch (e) {
      if (e.name === 'AbortError') {
        return;
      }
    }
  }

  update() {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.doPromise();
  }

  teardown() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }
}
