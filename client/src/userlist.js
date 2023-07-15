import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Userlist = ({ users, handleDelete }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchValue, users]);

  const handleSearchBar = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="user-list">
      <input
        id="searchbar"
        type="text"
        placeholder="Search_Users\~"
        onChange={handleSearchBar}
        value={searchValue}
      />
      {filteredUsers.map((user) => (
        <div className="user-preview" key={user._id}>
          <Link to={`/users/${user._id}`}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </Link>
          <button onClick={() => handleDelete(user._id)}>Close</button>
        </div>
      ))}
    </div>
  );
};

export default Userlist;