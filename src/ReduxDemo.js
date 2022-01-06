import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";

const initialState = {
  users: [],
  loading: false
};

const actionTypes = {
  SET_LOADING: "SET_LOADING",
  FETCH_USER: "FETCH_USER"
};

const userActions = {
  setLoading: (loading) => ({
    type: actionTypes.SET_LOADING,
    payload: loading
  }),
  fetchUsers: (users) => ({
    type: actionTypes.FETCH_USER,
    payload: users
  })
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.FETCH_USER:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(userReducer, applyMiddleware(thunk));

function FetchUsersList({ setUsers, setLoading }) {
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

function UsersList({ loading, users, setUsers, setLoading }) {
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

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  setUsers: (users) => dispatch(userActions.fetchUsers(users)),
  setLoading: (loading) => dispatch(userActions.setLoading(loading))
});

const ConnectedFetchUsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchUsersList);
const ConnectedUsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);

export default function ReduxDemo() {
  return (
    <Provider store={store}>
      <ConnectedFetchUsersList />
      <ConnectedUsersList />
    </Provider>
  );
}
