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
export class Home extends Component<IProps, IState> {
  state = {
    todoText: '',
  };
  render() {
    const {todoText} = this.state;
    return (
      <ContextTodo.Consumer>
        {context => (
          <View style={styles.mainCobtainer}>
            <View style={styles.inputCrad}>
              <TextInput
                style={styles.inputComponent}
                placeholder="Add Todo here.."
                value={this.state.todoText}
                onChangeText={(newText: string) =>
                  this.setState({todoText: newText})
                }
              />
              <TouchableOpacity
                style={styles.addTodoBtn}
                onPress={() => {
                  if (todoText !== '') {
                    context.addTodo(todoText);
                    this.setState({todoText: ''});
                  } else {
                    Alert.alert('Warning!', 'Please Enter Todo');
                  }
                }}>
                <Text style={styles.todoAddText}>Add</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headText}>Page1 Todo lists</Text>
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
                  <TouchableOpacity onPress={() => context.deleteTodo(item.id)}>
                    <Text style={styles.textItemTodo}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.page2Btn}
              onPress={() => {
                this.props.navigation.navigate('todo');
              }}>
              <Text style={styles.gotoText}>Go To Page 2</Text>
            </TouchableOpacity>
          </View>
        )}
      </ContextTodo.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  mainCobtainer: {
    flex: 1,
    padding: 20,
  },
  headText: {
    fontSize: 25,
    marginBottom: 10,
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
  },
  gotoText: {
    fontSize: 20,
    color: '#fff',
  },
  noTodosText: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 50,
  },
  lineText: {
    marginBottom: 15,
  },
});

export default Home;
