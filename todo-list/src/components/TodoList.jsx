import React, { useMemo, useState } from 'react';
import './styles/TodoList.css';
import TodoItem from './TodoItem';

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색 기능
  const getSearchResult = () => {
    return search === '' ? todo : todo.filter((e) => e.content.toLowerCase().includes(search.toLowerCase()));
    // 대소문자 구별 x
  };

  // 할일 분석 기능
  const analyzeTodo = useMemo(() => {
    console.log('an 함수 호출');
    const totalCount = todo.length;
    const doneCount = todo.filter((e) => e.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);

  const { totalCount, doneCount, notDoneCount } = analyzeTodo;
  return (
    <div className="TodoList">
      <h4>Todo List 🎄</h4>
      <div>
        <div>총 개수: {totalCount}</div>
        <div>완료된 할 일: {doneCount}</div>
        <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
      </div>
      <input className="searchbar" placeholder="검색어" value={search} onChange={onChangeSearch} />
      <div className="list_wrapper">
        {getSearchResult().map((e) => (
          <TodoItem key={e.id} {...e} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
