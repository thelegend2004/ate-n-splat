const initialFriends = [
  {
    id: 118836,
    name: "Наталія",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Оксана",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Іван",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Додати друга</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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
      <Button>Обрати</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Ім'я друга🫂</label>
      <input type="text" />

      <label>URL Фото📷</label>
      <input type="text" />

      <Button>Додати</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Розділити рахунок з другом</h2>

      <label>Рахунок💵</label>
      <input type="text" />

      <label>Твої витрати🫵</label>
      <input type="text" />

      <label>Витрати друга🧑</label>
      <input type="text" disabled />

      <label>Хто платить?🤑</label>
      <select>
        <option value="user">Ти</option>
        <option value="friend">Друг</option>
      </select>
    </form>
  );
}
