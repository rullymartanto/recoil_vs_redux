import { RecoilRoot, atom, useRecoilState, useRecoilValue } from "recoil";

const usersState = atom({
  key: "usersState",
  default: []
});

const loadingState = atom({
  key: "loadingState",
  default: false
});

function FetchUsersList() {
  const [, setUsers] = useRecoilState(usersState);
  const [, setLoading] = useRecoilState(loadingState);

  function handleClick() {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }

  return <button onClick={handleClick}>Refresh</button>;
}

function UsersList() {
  const users = useRecoilValue(usersState);
  const loading = useRecoilValue(loadingState);

  if (loading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <div>
      <p>List of users: {users.length}</p>
    </div>
  );
}

export default function RecoilDemo() {
  return (
    <RecoilRoot>
      <FetchUsersList />
      <UsersList />
    </RecoilRoot>
  );
}
