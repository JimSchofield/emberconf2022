import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import dadJokeFetch from '../utils/dad-joke-promise';

export default class GetDadJokeComponent extends Component {
  @tracked joke;
  @tracked error;

  constructor() {
    super(...arguments);

    this.fetchDadJoke();
  }

  async fetchDadJoke() {
    try {
      const res = await dadJokeFetch();

      const data = await res.json();

      this.joke = data.joke;
    } catch (error) {
      this.error = error;
    }
  }
}
