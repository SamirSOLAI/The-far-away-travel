import { useState } from "react";
import logo from "./logo.PNG";

function App() {
  const [list, setList] = useState([]);
  const [obj, setObj] = useState({ quantity: "1", item: "" });
  const [packedItems, setPackedItems] = useState(0);

  function handleCheckingBox(indexToToggle) {
    const updatedList = list.map((item, index) =>
      index === indexToToggle ? { ...item, packed: !item.packed } : item
    );
    setList(updatedList);

    const filterPackedItems = updatedList.filter((item) => item.packed);
    setPackedItems(filterPackedItems.length);
    console.log(filterPackedItems.length);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setObj({ ...obj, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (obj.item !== "") {
      setList([...list, { ...obj, packed: false }]);
      setObj({ quantity: "1", item: "" });
    }
  }

  function handleDelete(indexToDelete) {
    setList(list.filter((_, index) => index !== indexToDelete));
  }
  return (
    <div>
      <Logo />
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        list={list}
        obj={obj}
      />
      <PackingList
        list={list}
        handleDelete={handleDelete}
        handleCheckingBox={handleCheckingBox}
      />
      <Stats list={list} packedItems={packedItems} />
      <Flashcards />
    </div>
  );
}

function Form({ handleSubmit, list, handleChange, obj }) {
  return (
    <div className="add-form">
      <p>What do you need for your trip?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item"
          placeholder="item here"
          value={obj.item}
          onChange={handleChange}
        ></input>
        <select value={obj.quantity} onChange={handleChange} name="quantity">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <button>Add</button>
      </form>
    </div>
  );
}

function PackingList({ list, handleDelete, handleCheckingBox }) {
  return (
    <ul className="list">
      {list.map((item, index) => (
        <li key={index} className="list-element">
          {/* <button
            onClick={() => handleCheckingBox(index)}
            className={!item.packed ? "unchecked-box" : "checked-box"}
          >
            {!item.packed ? "" : "X"}
          </button> */}
          <input
            type="checkbox"
            checked={item.packed}
            onChange={() => handleCheckingBox(index)}
          />
          <div className={!item.packed ? "" : "text-barré"}>
            {item.quantity} {item.item}{" "}
          </div>
          <button className="delete-btn" onClick={() => handleDelete(index)}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

function Stats({ list, packedItems }) {
  return (
    <div className="stats">
      you have {list.length} items on your list, and you already packed{" "}
      {packedItems} (
      {list.length == 0 ? "0" : Math.round((packedItems * 100) / list.length)}%)
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <h1> 🏖 FAR AWAY ✈</h1>
    </div>
  );
}

function Flashcards() {
  const questions = [
    {
      id: 3457,
      question: "What language is React based on?",
      answer: "JavaScript",
      // isQuestion: true,
    },
    {
      id: 7336,
      question: "What are the building blocks of React apps?",
      answer: "Components",
      // isQuestion: true,
    },
    {
      id: 8832,
      question:
        "What's the name of the syntax we use to describe a UI in React?",
      answer: "JSX",
      // isQuestion: true,
    },
    {
      id: 1297,
      question: "How to pass data from parent to child components?",
      answer: "Props",
      // isQuestion: true,
    },
    {
      id: 9103,
      question: "How to give components memory?",
      answer: "useState hook",
      // isQuestion: true,
    },
    {
      id: 2002,
      question:
        "What do we call an input element that is completely synchronised with state?",
      answer: "Controlled element",
      // isQuestion: true,
    },
  ];

  return (
    <div className="flashcards">
      {questions.map((card) => (
        <Flashcard card={card} key={card.id} />
      ))}
    </div>
  );
}

function Flashcard(props) {
  const [isQuestionVisible, setIsQuestionVisible] = useState(true);

  function changeCard() {
    setIsQuestionVisible(!isQuestionVisible);
  }
  return (
    <button
      className={isQuestionVisible ? "flashcard-Q" : "flashcard-A"}
      onClick={changeCard}
    >
      {isQuestionVisible && <div>{props.card.question}</div>}
      {!isQuestionVisible && <div className="answer">{props.card.answer}</div>}
    </button>
  );
}
export default App;
export { Logo, Form, PackingList };
