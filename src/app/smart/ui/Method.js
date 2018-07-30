import joint from 'jointjs';

joint.shapes.basic.Generic.define('smart.Method', {
    attrs: {
        rect: {
            'width': 260
        },

        '.smart-entity-methods-rect': {
            'stroke': 'black',
            'stroke-width': 2,
            'fill': '#2980b9',
            'cursor': 'default'
        },

        '.smart-entity-methods-text': {
            'ref': '.smart-entity-methods-rect',
            'ref-y': 5,
            'ref-x': 5,
            'fill': 'black',
            'font-size': 12,
            'font-family': 'Times New Roman',
            'cursor':'default'
        }
    },

    name: [],
    attributes: [],
    methods: []
}, {
    markup: `<rect class="smart-entity-methods-rect"/>
      <text class="smart-entity-methods-text"/>`,

    initialize: function () {

        this.on('change:methods', function () {
            this.updateRectangles();
            this.trigger('uml-update');
        }, this);

        this.updateRectangles();

        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },

    getClassName: function () {
        return this.get('name');
    },

    updateRectangles: function () {

        var attrs = this.get('attrs');

        var rects = [{
            type: 'methods',
            text: this.get('methods')
        }];

        var offsetY = 0;

        rects.forEach(function (rect) {

            var lines = Array.isArray(rect.text) ? rect.text : [rect.text];
            var rectHeight = lines.length * 20 + 20;

            attrs['.smart-entity-' + rect.type + '-text'].text = lines.join('\n');
            attrs['.smart-entity-' + rect.type + '-rect'].height = rectHeight;
            attrs['.smart-entity-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

            offsetY += rectHeight;
        });
    }

});

// joint.shapes.smart.EntityView = joint.dia.ElementView.extend({

//   initialize: function() {

//       joint.dia.ElementView.prototype.initialize.apply(this, arguments);

//       this.listenTo(this.model, 'uml-update', function() {
//           this.update();
//           this.resize();
//       });
//   }
// });

// export default joint.shapes.smart.EntityView;