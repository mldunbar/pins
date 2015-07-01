import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('landing', {path: '/'});

  this.route('sessions', function(){
    this.route('create');
  });

  this.route('users', function(){
    this.route('create');
  });

  this.route('pins', function() {
    this.route('create');
    this.route('loading');
    this.route('show', {path: '/:pin_id'});
  });
});

export default Router;
