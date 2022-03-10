import Component from '@glimmer/component';
import PromiseHandler from '../utils/promise-handler';
import dadJokeFetch from '../utils/dad-joke-promise';

export default class GetDadJokeComponent extends Component {
  constructor() {
    super(...arguments);

    this.fetchHandler = new PromiseHandler(() => dadJokeFetch());
  }

  get joke() {
    return this.fetchHandler.value?.joke;
  }

  get error() {
    return this.fetchHandler.error;
  }
}
