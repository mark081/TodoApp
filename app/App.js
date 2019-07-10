/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import Heading from "./Heading";
import Input from "./Input";
import Button from "./Button";
import TodoList from "./TodoList";

let todoIndex = 0;

const App = () => {
  const [getTodos, setTodos] = useState({
    inputValue: "",
    todos: [],
    type: "All"
  });

  useEffect(() => {
    console.log(`useEffect:${getTodos.inputValue}`);
  }, [getTodos]);

  let submitTodo;
  submitTodo = () => {
    let inputValue = getTodos.inputValue;
    console.log(`Input Value:${inputValue}`);
    let regex = /^\s*$/;
    if (inputValue.match(regex)) {
      return;
    }
    const todo = {
      title: inputValue,
      todoIndex,
      complete: false,
    };
    todoIndex++;
    setTodos({ ...getTodos, todos: [...getTodos.todos, todo], inputValue: "" });
  };

  const deleteTodo = todoIndex => {
    let { todos } = getTodos;
    todos = todos.filter(todo => todo.todoIndex !== todoIndex);
    setTodos({ ...getTodos, todos });
  };

  const toggleComplete = todoIndex => {
    let { todos } = getTodos;
    todos.forEach(todo => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete;
      }
    });
    setTodos({ ...getTodos, todos });
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
        <Heading />
        <Input
          inputValue={getTodos.inputValue}
          inputChange={text => setTodos({ ...getTodos, inputValue: text })}
        />
        <TodoList
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          todos={getTodos.todos}
        />
        <Button submitTodo={submitTodo} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
});

export default App;
