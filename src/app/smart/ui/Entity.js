import joint from 'jointjs';

joint.shapes.basic.Generic.define('smart.Entity', {
  attrs: {
      rect: { 'width': 200 },

      '.smart-entity-name-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#3498db' },

      '.smart-entity-name-text': {
          'ref': '.smart-entity-name-rect',
          'ref-y': .5,
          'ref-x': .5,
          'text-anchor': 'middle',
          'y-alignment': 'middle',
          'font-weight': 'bold',
          'fill': 'black',
          'font-size': 12,
          'font-family': 'Times New Roman'
      },
  },

  name: [],
  attributes: [],
  methods: []
}, {
  markup: `<rect class="smart-entity-name-rect"/>
      <text class="smart-entity-name-text"/>`,

  initialize: function() {

      this.on('change:name change:attributes change:methods', function() {
          this.updateRectangles();
          this.trigger('uml-update');
      }, this);

      this.updateRectangles();

      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getClassName: function() {
      return this.get('name');
  },

  updateRectangles: function() {

      var attrs = this.get('attrs');

      var rects = [
          { type: 'name', text: this.getClassName() },
      ];

      var offsetY = 0;

      rects.forEach(function(rect) {

          var lines = Array.isArray(rect.text) ? rect.text : [rect.text];
          var rectHeight = lines.length * 20 + 20;

          attrs['.smart-entity-' + rect.type + '-text'].text = lines.join('\n');
          attrs['.smart-entity-' + rect.type + '-rect'].height = rectHeight;
          attrs['.smart-entity-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

          offsetY += rectHeight;
      });
  }

});
