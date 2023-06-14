import React, {Component} from 'react';
import Home from './components/Home';
import Todo from './components/Todo';
import ContextTodo from './components/ContextTodo';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
interface IState {
  todoName: any[];
}
export class App extends Component<IState> {
  state = {
    todoName: [],
  };
  addTodo = (newText: string) => {
    const newTodo = {id: new Date(), taskName: newText};
    this.setState({todoName: [...this.state.todoName, newTodo]});
  };
  deleteTodo = (id: string) => {
    const {todoName} = this.state;
    const filteredTodo = todoName.filter((each: any) => each.id !== id);
    this.setState({todoName: filteredTodo});
  };
  // updatedTodo: () => {};
  render() {
    return (
      <ContextTodo.Provider
        value={{
          todoName: this.state.todoName,
          addTodo: this.addTodo,
          deleteTodo: this.deleteTodo,
          // updatedTodo: this.updatedTodo,
        }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="todo" component={Todo} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextTodo.Provider>
    );
  }
}

export default App;
