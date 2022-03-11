import Component from '@glimmer/component';
import PromiseHandler from '../utils/promise-handler';
import dadJokeFetch from '../utils/dad-joke-promise';
import { associateDestroyableChild } from '@ember/destroyable';
import { cached } from '@glimmer/tracking';

const CACHE = new WeakMap();

export default class GetDadJokeComponent extends Component {
  @cached
  get fetchHandler() {
    let resource;

    if (CACHE.has(this)) {
      resource = CACHE.get(this);

      resource.update(this.args);

      return resource;
    }

    const newResource = associateDestroyableChild(
      this,
      new PromiseHandler((signal, newTerm) =>
        dadJokeFetch(this.args.searchTerm, signal, newTerm)
      )
    );

    CACHE.set(this, newResource);

    return newResource;
  }

  get noJoke() {
    return this.fetchHandler.value?.results.length === 0;
  }

  get joke() {
    return this.fetchHandler.value?.results[0]?.joke;
  }

  get error() {
    return this.fetchHandler.error;
  }
}
