import React, { useRef, useState } from 'react';
import './styles/TodoEditor.css';

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState('');
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (!content) {
      inputRef.current.focus();
      return;
      // 공백 상태에서 버튼 클릭 시 포커스
    }
    onCreate(content);
    setContent('');
    // 입력 후 공백으로 변경
  };

  // enter 클릭 시 onSubmit 함수 호출
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기 ✏</h4>
      <div className="editor_wrapper">
        <input
          placeholder="새로운 Todo..."
          value={content}
          onChange={onChangeContent}
          ref={inputRef}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
