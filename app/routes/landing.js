import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    if(this.get('session.isAuthenticated')){
      this.transitionTo('users.show',
      this.get('session.secure.userId'));
    }
  }
});
