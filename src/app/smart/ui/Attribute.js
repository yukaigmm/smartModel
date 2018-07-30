import joint from 'jointjs';

joint.shapes.basic.Generic.define('smart.Attribute', {
    attrs: {
        rect: {
            'width': 260
        },

        '.smart-entity-attrs-rect': {
            'stroke': 'black',
            'stroke-width': 2,
            'fill': '#2980b9'
        },

        '.smart-entity-attrs-text': {
            'ref': '.smart-entity-attrs-rect',
            'ref-y': 5,
            'ref-x': 5,
            'fill': 'black',
            'font-size': 12,
            'font-family': 'Times New Roman'
        },
    },

    name: [],
    attributes: [],
    methods: []
}, {
    markup: `<rect class="smart-entity-attrs-rect"/>`,

    initialize: function () {

        this.on('change:attributes', function () {
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
        var attributes = this.get('attributes');
        // var offsetY = 0;
        // attributes.forEach((item,index)=>{
        //     offsetY = 20 * index;
        //     console.log(index)
        //     console.log(item)
        attrs['.smart-entity-attrs-text'].attributes = attributes;
        //     attrs['.smart-entity-attrs-rect'].height = 40;
        attrs['.smart-entity-attrs-rect'].transform = 'translate(0,0)';
        // })
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