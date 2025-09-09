import { useState } from "react";

const initialFriends = [
  {
    id: 117836,
    name: "Наталія",
    image: "https://i.pravatar.cc/48?u=117836",
    balance: -7,
  },
  {
    id: 931372,
    name: "Оксана",
    image: "https://i.pravatar.cc/48?u=931372",
    balance: 20,
  },
  {
    id: 497476,
    name: "Іван",
    image: "https://i.pravatar.cc/48?u=497476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((prev) => !prev);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    handleShowAddFriend();
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setShowAddFriend(false);
  };

  const handleSplitBIll = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : { ...friend }
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          friends={friends}
          onSelectFriend={handleSelectFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Закрити" : "Додати друга"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          onSplitBill={handleSplitBIll}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          Ти винен {friend.name} {Math.abs(friend.balance)}₴
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} винен тобі {Math.abs(friend.balance)}₴
        </p>
      )}
      {friend.balance === 0 && <p>{friend.name} та ти квити</p>}
      <Button onClick={() => onSelectFriend(isSelected ? null : friend)}>
        {isSelected ? "Закрити" : "Обрати"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    setName("");
    setImage("https://i.pravatar.cc/48?u=");

    onAddFriend(newFriend);
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Ім'я друга🫂</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>URL Фото📷</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Додати</Button>
    </form>
  );
}

function FormSplitBill({ onSplitBill, selectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Розділити рахунок з {selectedFriend.name}</h2>

      <label>Рахунок💵</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Твої витрати🫵</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>Витрати {selectedFriend.name}🧑</label>
      <input type="text" disabled value={paidByFriend} />

      <label>Хто платить?🤑</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">Ти</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Розділити рахунок</Button>
    </form>
  );
}
