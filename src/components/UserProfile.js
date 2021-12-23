import { useLocation } from 'react-router-dom'

function UserProfile() {
  const location = useLocation()
  const { userId } = location.state //user passed from Link (friends page)

  const [loading, setLoading] = useState(false);  
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/users/${userId}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setProfile(response.data, console.log("profile ", response.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <>
      <h1>USER PROFILE</h1>
    </>
  );
}

export default UserProfile;
