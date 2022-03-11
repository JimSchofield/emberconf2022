import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SearchForDadJokeComponent extends Component {
  @tracked searchTerm = 'cat';

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }
}
