import joint from 'jointjs';

joint.shapes.basic.Generic.define('smart.AttributeItem', {
  attrs: {
      rect: { 'width': 260 },

      '.smart-entity-attr-item-rect': {
          'stroke': '#fff', 
          'stroke-width': 0.5, 
          'fill': '#9687fe',
          'cursor':'default'
        },

      '.smart-entity-attr-item-text': {
          'ref': '.smart-entity-attr-item-rect', 
          'ref-y': 5, 
          'ref-x': 5,
          'fill': '#fff', 
          'font-size': 12, 
          'font-family': 'Times New Roman',
          'cursor':'default'
      },
  },

  name: [],
  attributes: [],
  methods: []
}, {
  markup: `<rect class="smart-entity-attr-item-rect"/>
  <text class="smart-entity-attr-item-text"/>`,

  initialize: function() {

    //   this.on('change:attributes', function() {
    //       this.updateRectangles();
    //       this.trigger('uml-update');
    //   }, this);

    //   this.updateRectangles();
    var attrs = this.get('attrs')
      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
      let attr = arguments[0].attrs;
      for(let key in attr){
        if(key != 'target'){
            attrs['.smart-entity-attr-item-text'].text = `${key}:${attrs[key]}`;
            attrs['.smart-entity-attr-item-rect'].height = 20;
            attrs['.smart-entity-attr-item-rect'].transform = 'translate(0,0)';
        }
      }
  },

//   getClassName: function() {
//       return this.get('name');
//   },

//   updateRectangles: function() {

//   }

});