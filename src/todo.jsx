import { useState } from "react";
import { useEffect } from "react";

export default function TodoApp() {
  const [todoData, setTodoData] = useState([]);
  const [inpValue, setInpValue] = useState("");
  const [editId, setEditId] = useState(null);

  // 添加
  const addFn = () => {
    if (inpValue.trim() !== "") {
      if (editId !== null) {
        setTodoData(
          todoData.map((todo) =>
            todo.id === editId ? { id: editId, description: inpValue } : todo
          )
        );
        setEditId(null);
      } else {
        setTodoData([...todoData, { id: Date.now(), description: inpValue }]);
        //在末尾添加一个新元素，id 是时间戳，desc 是输入的值
      }
      setInpValue("");
    }
  };

  // 编辑
  const editFn = (id, text) => {
    setEditId(id);
    setInpValue(text);
  };

  // 删除
  const deleteFn = (id) => {
    setTodoData(todoData.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h2>Todo App</h2>
      <input
        type="text"
        value={inpValue}
        onChange={(e) => setInpValue(e.target.value)}
      />
      <button onClick={addFn}>{editId === null ? "添加" : "更新"}</button>
      <ul>
        {/* 展示 */}
        {todoData.map((item) => (
          <li key={item.id}>
            {item.description}
            <button onClick={() => editFn(item.id, item.description)}>
              编辑
            </button>
            <button onClick={() => deleteFn(item.id)}>删除</button>
          </li>
        ))}
      </ul>
    </>
  );
}
