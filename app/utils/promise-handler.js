import { tracked } from '@glimmer/tracking';

export default class PromiseHandler {
  @tracked value;
  @tracked error;

  constructor(promise, immediate = true) {
    this.promise = promise;

    if (immediate) {
      this.doFetch();
    }
  }

  async doFetch() {
    const res = await this.promise();

    const data = await res.json();

    this.value = data;
  }
}
