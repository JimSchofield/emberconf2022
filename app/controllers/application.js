import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked toggleValue = false;

  @action
  toggle() {
    this.toggleValue = !this.toggleValue;
  }
}
