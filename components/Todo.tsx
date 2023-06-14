import {
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import ContextTodo from './ContextTodo';
interface IProps {
  navigation?: any;
}
interface IState {
  todoText: string;
}
export class Todo extends Component<IProps, IState> {
  state = {
    todoText: '',
  };
  render() {
    const {todoText} = this.state;
    return (
      <ContextTodo.Consumer>
        {context => {
          const addItem = (text: string) => {
            context.addTodo(text);
            this.setState({todoText: ''});
          };
          return (
            <View style={styles.mainCobtainer}>
              <View style={styles.inputCrad}>
                <TextInput
                  style={styles.inputComponent}
                  value={this.state.todoText}
                  placeholder="Add Todo here.."
                  onChangeText={(newText: string) =>
                    this.setState({todoText: newText})
                  }
                />
                <TouchableOpacity
                  style={styles.addTodoBtn}
                  onPress={() => {
                    if (todoText !== '') {
                      addItem(todoText);
                    } else {
                      Alert.alert('Warning!', 'Please Enter Todo');
                    }
                  }}>
                  <Text style={styles.todoAddText}>Add</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.headText}>Page 2 Todo lists</Text>
              <Text style={styles.lineText}>
                _________________________________________________
              </Text>
              {context.todoName.length === 0 && (
                <Text style={styles.noTodosText}>No Todos</Text>
              )}
              <FlatList
                data={context.todoName}
                renderItem={({item}: {item: any}) => (
                  <View style={styles.todoItemCard}>
                    <Text style={styles.textItemTodo}>{item.taskName}</Text>
                    <TouchableOpacity
                      onPress={() => context.deleteTodo(item.id)}>
                      <Text style={styles.textItemTodo}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <TouchableOpacity
                style={styles.page2Btn}
                onPress={() => {
                  this.props.navigation.navigate('home');
                }}>
                <Text style={styles.gotoText}>Go To Page 1</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </ContextTodo.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  mainCobtainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  headText: {
    fontSize: 25,
    marginBottom: 10,
    color: '#fff',
  },
  inputCrad: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputComponent: {
    borderColor: '#000',
    borderWidth: 1,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  addTodoBtn: {
    backgroundColor: '#0f4fb8',
    marginLeft: 10,
    height: 40,
    padding: 5,
    borderRadius: 10,
    width: 90,
    alignItems: 'center',
  },
  todoAddText: {
    fontSize: 20,
    color: '#fff',
  },
  todoItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5cc45',
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
  },
  textItemTodo: {
    fontSize: 18,
    fontWeight: '500',
  },
  page2Btn: {
    backgroundColor: '#0d3bd4',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  gotoText: {
    fontSize: 20,
    color: '#fff',
  },
  noTodosText: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 50,
    color: '#fff',
  },
  lineText: {
    marginBottom: 15,
    color: '#fff',
  },
});

export default Todo;
