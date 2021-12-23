import axios from "axios";
import LoadingModal from "./LoadingModal"

function FriendList() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [friendsList, setFriendsList] = useState();

  useEffect(() => {
    getFriendsData();
  }, []);

  const getFriendsData = async () => {
    setLoading(true);
    const userId = user._id
    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/users/${userId}/friends`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setFriendsList(response.data, console.log(response.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };



  return (
    <>
      {loading && <LoadingModal />}
      {friendsList && (
        <ul style={{ padding: 0 }}>
          {friendsList.friends.map((item, index) => {
            return (
              <li
                key={index}
                className="d-flex flex-direction-column justify-content-center"
              >
                <Post getFriendsData={getFriendsData} item={item} index={index} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default FriendList;
