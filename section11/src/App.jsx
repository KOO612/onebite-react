import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import { useState, useRef, useReducer, useCallback, createContext, useMemo } from 'react';
const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'react 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래연습',
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) => (item.id === action.targetId ? { ...item, isDone: !item.isDone } : item));
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

// 데이터를 하위에 있는 컴포넌트에 공급하기 위해서이기 때문에
// App 안에 넣으면 리렌더링 될 때마다 새로 생성되니깐 밖에 작성
export const TodoStateContext = createContext();

export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 todo 아이템의 isDone 변경
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  };

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onDelete, onUpdate };
  }, []);
  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
