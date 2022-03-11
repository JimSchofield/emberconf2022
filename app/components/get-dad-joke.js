import Component from '@glimmer/component';
import PromiseHandler from '../utils/promise-handler';
import dadJokeFetch from '../utils/dad-joke-promise';
import { associateDestroyableChild } from '@ember/destroyable';

export default class GetDadJokeComponent extends Component {
  constructor() {
    super(...arguments);

    this.fetchHandler = associateDestroyableChild(
      this,
      new PromiseHandler(dadJokeFetch)
    );
  }

  get joke() {
    return this.fetchHandler.value?.joke;
  }

  get error() {
    return this.fetchHandler.error;
  }
}

