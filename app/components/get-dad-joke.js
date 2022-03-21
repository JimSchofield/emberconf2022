import Component from '@glimmer/component';
import dadJokeFetch from '../utils/dad-joke-promise';
import { useTask } from 'ember-resources';
import { task } from 'ember-concurrency';

export default class GetDadJokeComponent extends Component {
  jokeTask = useTask(this, this.getJoke, () => [this.args.searchTerm]);

  @task
  *getJoke() {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    try {
      const res = yield dadJokeFetch(
        this.args.searchTerm,
        this.abortController.signal
      );

      const data = yield res.json();

      return data.results[0].joke;
    } catch (e) {
      if (e.name === 'AbortError') {
        return;
      }
    }
  }
}
