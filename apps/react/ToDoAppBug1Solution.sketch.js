"use strict"; // strict mode should be used

import React, { Component } from 'react';

// https://github.com/substack/deep-freeze
function deepFreeze (o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  
  return o;
};

function inspectState(thizState) {
  console.log("####");
  const keys = Object.keys(thizState);
  for (var i = 0; i < keys.length; i++) {
    console.log("K- " + keys[i]);
    const stateElem = thizState[keys[i]];
    console.log(typeof stateElem);
    if (['string', 'boolean', 'number'].includes(typeof stateElem) === false) {
      console.log("freezing " + keys[i]);
      deepFreeze(stateElem);
    }
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: ['Buy Milk', 'Buy Sugar', 'Buy Beer'], age:4, b:true, name:"hamid"
    };
    //** Begin-Instrument ///
    
    inspectState(this.state);
    var origSetState = this.setState;
    origSetState = origSetState.bind(this);
    this.setState = function(obj) {
      console.log("my set state!");
      inspectState(obj);
      origSetState(obj);
    }
    //** End-Instrument */
  }
  
  

  addTodoItem = item => { 
    this.state.items.push(item); // bug1
    //this.setState({items: [...this.state.items, item]})
  };

  render() { 
    return <div>
        <TodoList items={this.state.items}/>
        <TodoForm addTodoItem={this.addTodoItem}/>
    </div>
  } 

}

class TodoList extends React.Component {
  render() {
    return (
        <div>
            <h1>Your Todo Items</h1>
            <ul>
                {this.props.items.map(item => 
                    <li key={item}>{item}</li>)} 
            </ul>
        </div>
    )
  }
}

class TodoForm extends React.Component {
  state = {
    inputFieldValue: 'Enter a new todo item!'
  };
  onChange = e => {
    this.setState({inputFieldValue: e.target.value})
  };
  onSubmit = e => {
    e.preventDefault()
    this.props.addTodoItem(this.state.inputFieldValue)
  };
  render() {
    return (
        <form onSubmit={this.onSubmit}>
            <input type='text' value={this.state.inputFieldValue} onChange={this.onChange}/>
            <input type='submit' value='Save'/>
        </form>
    )
  }

}

export default App;
