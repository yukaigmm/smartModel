import 'jointjs/dist/joint.min.css';
import './SmartModeling.css';
import joint from 'jointjs';
import EntityUI from './ui/Entity';
import AttributeUI from './ui/Attribute';
import AttributeItemUI from './ui/AttributeItem';
import Method from './ui/Method';
 
// import _ from 'lodash';
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { getViewPort } from '../utils';
import GraphJSON from './GraphJSON.json';

export default class SmartModeling extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentClickElementPosition:null,
      entityElements:[],
      attributeElements:[],
      methodElements:[],
      attributeItems:[]
    }
    this.setChildNotDragable = this.setChildNotDragable.bind(this);
    this.setAttributeElements = this.setAttributeElements.bind(this);
    this.setLink = this.setLink.bind(this);
    this.setEmbed = this.setEmbed.bind(this);
  }
  componentDidMount() {
    let viewPort = getViewPort();
    // 画布设置
    let setting = {
      gridSize: 1,
      linkPinning: true,
      markAvailable: true,
      validateEmbedding: (childView, parentView) => {
        return true;
      },
      validateConnection: (sourceView, sourceMagnet, targetView, targetMagnet) => {
        return (sourceMagnet && targetMagnet);
      }
    };
    // 初始化画布
    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.Paper({
      el: this.rootDom,
      width: viewPort.width,
      height: viewPort.height,
      model: this.graph,
      ...setting
    });
    this.graph.fromJSON(this.getGraphJSON());
    this.setEmbed();
    // 设置内嵌元素不能拖动（需要放在最后）
    for(let item of this.graph.getCells()){
      this.setChildNotDragable(item);
    }
  }

  getGraphJSON() {
    return GraphJSON;
  }
  initElements(){
  }
  // 遍历元素，将元素分类，并设置元素嵌套
  setEmbed(){
    let parentCell;
    let entityElements = [],attributeElements = [],methodElements = [],attributeItems=[];
    let attrCellHeight;
    let cells = this.graph.getCells();
    for(let item of cells){
      if(item.attributes.type === 'smart.Entity'){
        parentCell = item;
        entityElements.push(item)
      }else if(item.attributes.type === 'smart.Attribute'){
        parentCell.embed(item);
        attributeElements.push(item);
        item.position(0,40,{parentRelative: true});
        this.setAttributeElements(item,attributeItems);
        attrCellHeight = item.getEmbeddedCells().length * 20 ;
      }else if(item.attributes.type === 'smart.Method'){
        methodElements.push(item);
        parentCell.embed(item);
        // 根据attribute模块的高度动态设置method模块的位置
        item.position(0,attrCellHeight + 36,{parentRelative: true})
      }
    }
    this.setState({
      entityElements,
      attributeElements,
      methodElements,
      attributeItems
    },()=>{
      console.log(this.state)
    })
  }
  // 设置嵌套的元素不能被拖动
  setChildNotDragable(item){
    this.paper.on('element:pointerdown',(elementView)=>{
      if(elementView.model.parent()){
        this.setState({
          currentClickElementPosition:elementView.model.attributes.position
        })
        item.on('change:position',(element)=>{
          let position = this.state.currentClickElementPosition;
          if(elementView.model.parent() && position){
            element.position(position.x,position.y)
          }
        })
      }else{
        this.setState({
          currentClickElementPosition:null
        })
      }
    })
  }
  // 设置attributeItem元素
  setAttributeElements(item,attributeItems){
    let index = 0;
    let attrElement;
    for(let attr of item.attributes.attributes){
      attrElement = new joint.shapes.smart.AttributeItem({
        attrs:attr,
      }).addTo(this.graph);
      item.embed(attrElement);
      attrElement.position(0,20*index-1,{parentRelative: true});
      index++;
      if(attr.target){
        this.setLink(attrElement,attr)
      }
      attributeItems.push(attrElement);
      // item.fitEmbeds({padding:0})
    }
  }
  // 设置连线
  setLink(attrElement,attr){
    let link = new joint.dia.Link({
      router: { name: 'manhattan' },
      connector: { name: 'rounded' },
      // router:{name:'orthogonal'},
      attrs:{
        '.marker-target': {
          fill: '#000',
          d: 'M 10 0 L 0 5 L 10 10 z'
        }
      }
    });
    link.source(attrElement,{
      anchor:{
        name:'right'
      }
    });
    for(let item of this.graph.getCells()){
      if(item.attributes.name == attr.target){
        for(let child of item.getEmbeddedCells({deep:true})){
          for(let key in attr){
            if(key != 'target'){
              if(child.attributes.attrs['.smart-entity-attr-item-text'] && child.attributes.attrs['.smart-entity-attr-item-text'].text.includes(attr[key])){
                link.target(child,{
                  anchor:{
                    name:'left'
                  }
                });
                link.addTo(this.graph);
              }
            }
          }
        }
      }
    }
  }
  render() {
    return (
      <div className="smart-modeling" ref={(dom) => { this.rootDom = dom; }} >
      </div>
    );
  }
}
