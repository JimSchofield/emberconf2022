import Component from '@glimmer/component';
import dadJokeFetch from '../utils/dad-joke-promise';
import { use } from 'ember-could-get-used-to-this';
import PromiseHandler from '../helpers/promise-handler';

export default class GetDadJokeComponent extends Component {
  @use jokeResource = new PromiseHandler(() => ({
    named: {
      promise: dadJokeFetch,
      searchTerm: this.args.searchTerm,
    },
  }));

  get noJoke() {
    return this.jokeResource?.results.length === 0;
  }

  get joke() {
    return this.jokeResource?.results
      ? this.jokeResource.results[0].joke
      : null;
  }

  get error() {
    return this.jokeResource?.error;
  }
}
