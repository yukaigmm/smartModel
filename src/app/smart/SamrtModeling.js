import 'jointjs/dist/joint.min.css';
import './SmartModeling.css';
import joint from 'jointjs';
import EntityUI from './ui/Entity';
import AttributeUI from './ui/Attribute';
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
      currentClickElementPosition:null
    }
    this.setChildNotDragable = this.setChildNotDragable.bind(this)
  }
  componentDidMount() {
    let viewPort = getViewPort();
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

    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.Paper({
      el: this.rootDom,
      width: viewPort.width,
      height: viewPort.height,
      model: this.graph,
      ...setting
    });
    this.graph.fromJSON(this.getGraphJSON());
    console.log(this.graph.getCells())
    this.setEmbed();

    // console.log("after component mount, g = ", joint.g);
  }

  getGraphJSON() {
    return GraphJSON;
  }
  initElements(){
    for(let item of GraphJSON.cells){

    }
  }
  // 设置元素嵌套
  setEmbed(){
    let parentCell;
    let attrCell;
    let methodCell;
      let cells = this.graph.getCells();
      for(let item of cells){
        if(item.attributes.type === 'smart.Entity'){
          parentCell = item;
        }else if(item.attributes.type === 'smart.Attribute'){
          parentCell.embed(item);
          item.position(0,40,{parentRelative: true})
        }else if(item.attributes.type === 'smart.Method'){
          parentCell.embed(item)
          item.position(0,100,{parentRelative: true})
        }
        this.setChildNotDragable(item)
      }
  }
  // 设置嵌套的元素不能被拖动
  setChildNotDragable(item){
    this.paper.on('element:pointerdown',(elementView)=>{
      if(['smart.Method','smart.Attribute'].includes(elementView.model.attributes.type)){
        this.setState({
          currentClickElementPosition:elementView.model.attributes.position
        })
        item.on('change:position',(element)=>{
          if(['smart.Method','smart.Attribute'].includes(element.attributes.type) && this.state.currentClickElementPosition){
            element.position(this.state.currentClickElementPosition.x,this.state.currentClickElementPosition.y)
          }
        })
      }else{
        this.setState({
          currentClickElementPosition:null
        })
      }
    })
    
  }
  render() {
    return (
      <div className="smart-modeling" ref={(dom) => { this.rootDom = dom; }} >
      </div>
    );
  }
}
