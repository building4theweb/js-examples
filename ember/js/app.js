window.App = Ember.Application.create({});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [];
  }
});

App.IndexController = Ember.ArrayController.extend({
  totalTasks: function() {
    return this.get('content').get('length');
  }.property('content.@each'),

  remainTasks: function() {
    return this.get('content').filterBy('completed', false).get("length");
  }.property('content.@each', 'content.@each.completed'),

  actions: {
    addItem: function() {
      if (this.get('title')) {
        this.get('content').pushObject({
          title: this.get('title'),
          completed: false
        });
        this.set('title', '');
      }
    },

    removeItem: function(item) {
      this.get('content').removeObject(item);
    }
  }
});
