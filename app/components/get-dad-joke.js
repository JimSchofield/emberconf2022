import Component from '@glimmer/component';
import dadJokeFetch from '../utils/dad-joke-promise';
import { trackedFunction } from 'ember-resources';
import { tracked } from '@glimmer/tracking';

export default class GetDadJokeComponent extends Component {
  @tracked error;

  jokeResource = trackedFunction(this, async () => {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    try {
      const res = await dadJokeFetch(
        this.args.searchTerm,
        this.abortController.signal
      );

      const data = await res.json();

      return data.results[0].joke;
    } catch (e) {
      if (e.name === 'AbortError') {
        return;
      }

      this.error = e;
    }
  });

  get joke() {
    return this.jokeResource.value;
  }
}
