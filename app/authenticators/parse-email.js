import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

//Copied from https://github.com/clintjhill/ember-parse-adapter/wiki/Ember-Simple-Auth-Cookbook
var ParseAuthenticator;

ParseAuthenticator = Base.extend({
  restore: function(data) {
    var adapter, sessionToken, store;
    if (data == null) {
      data = {};
    }
    store = this.container.lookup('store:main');
    adapter = store.adapterFor('application');
    sessionToken = data.sessionToken;

    adapter.set('sessionToken', sessionToken);

    return store.modelFor('parseUser').current(store, data).then(function(user) {
      adapter.set('sessionToken', user.get('sessionToken'));
      data = {
        userId: user.get('id'),
        sessionToken: user.get('sessionToken')
      };
      return data;
    });
  },

  authenticate: function(data) {
    var adapter, store, user;
    if (data == null) {
      data = {};
    }
    store = this.container.lookup('store:main');
    adapter = store.adapterFor('application');
    user = data.user;
    if (user) {
      adapter.set('sessionToken', user.get('sessionToken'));
      data = {
        userId: user.get('id'),
        sessionToken: user.get('sessionToken')
      };
      return Ember.RSVP.resolve(data);
    } else {
      return store.modelFor('parseUser').login(store, {
        username: data.identification,
        password: data.password
      }).then(function(user) {
        adapter.set('sessionToken', user.get('sessionToken'));
        data = {
          userId: user.get('id'),
          sessionToken: user.get('sessionToken')
        };
        return data;
      }, console.error.bind(console));
    }
  },
  invalidate: function() {
    var adapter;
    adapter = this.container.lookup('adapter:application');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      adapter.set('sessionToken', null);
      return resolve();
    });
  }
});

export default ParseAuthenticator;
