/* global Backbone, _ */

$(function() {

  var Item = Backbone.Model.extend({
    defaults: {
      completed: false
    }
  });


  var List = Backbone.Collection.extend({
    model: Item
  });


  var ItemView = Backbone.View.extend({
    tagName: 'li',
    $template: $('#itemTemplate').html(),

    initialize: function() {
      this.listenTo(this.model, 'change', this.toggleState);
    },

    events: {
      'click input': 'onCheckboxClick',
      'click a': 'onRemoveClick'
    },

    onCheckboxClick: function() {
      var $checkbox = this.$el.find('input');

      if ($checkbox.is(':checked')) {
        this.model.set({completed: true});
      } else {
        this.model.set({completed: false});
      }
    },

    onRemoveClick: function(event) {
      event.preventDefault();
      this.model.destroy();
      this.remove();
    },

    toggleState: function() {
      if (this.model.get('completed')) {
        this.$el.addClass('completed');
      } else {
        this.$el.removeClass('completed');
      }
    },

    render: function() {
      var data = this.model.toJSON();
      this.$el.html(_.template(this.$template, data));

      return this.$el;
    }
  });


  var ListView = Backbone.View.extend({
    el: $('#app'),
    $template: $('#appTemplate').html(),

    events: {
      'submit form': 'onFormSubmit'
    },

    initialize: function() {
      this.collection = new List();
      this.listenTo(this.collection, 'add', this.appendItem);
      this.listenTo(this.collection, 'remove', this.removeItem);
      this.listenTo(this.collection, 'change:completed', this.updateCounts);
      this.render();
    },

    onFormSubmit: function(event) {
      event.preventDefault();

      var $input = this.$el.find('input'),
          value = $input.val();

      $input.val('');

      if (value !== '') {
        var item = new Item();
        item.set({
          title: value
        });

        this.collection.add(item);
      }
    },

    appendItem: function(item) {
      var itemView = new ItemView({model: item});
      this.$el.find('ol').append(itemView.render());
      this.updateCounts();
    },

    removeItem: function() {
      this.updateCounts();
    },

    updateCounts: function() {
      this.$el.find('.total').html(this.collection.length);

      var remain = this.collection.filter(function(item) {
        return item.get('completed') === false;
      });

      this.$el.find('.remain').html(remain.length);
    },

    render: function() {
      var data = this.collection.toJSON();
      this.$el.html(_.template(this.$template, data));
    }
  });


  window.ListView = new ListView();

});
