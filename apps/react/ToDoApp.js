import React, { Component } from 'react';

class App extends Component {
  state = { 
    items: ['Buy Milk', 'Buy Sugar']
  };

  addTodoItem = item => { 
    this.setState({items: [...this.state.items, item]})
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
