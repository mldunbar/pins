import DS from 'ember-data';

export function initialize(container){
  var ParseUser = container.lookup('store:main').modelFor('parse-user');
    ParseUser.reopen({
      firstName: DS.attr('string'),
      lastName: DS.attr('string')
    });
}

export default {
  name: 'parse-user',
  initialize: initialize
};
