import { tracked } from '@glimmer/tracking';
import { Resource } from 'ember-could-get-used-to-this';
import dadJokePromise from '../utils/dad-joke-promise';

export default class DadJokeHelper extends Resource {
  @tracked value;

  setup() {
    this.doPromise();
  }

  async doPromise() {
    const abortController = new AbortController();

    this.abortController = abortController;

    try {
      // Passing no search term or a falsey value defaults to random joke
      const result = await dadJokePromise(false, abortController.signal);

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
