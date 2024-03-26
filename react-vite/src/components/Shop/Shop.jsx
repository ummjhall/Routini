import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ViewAvatar from "../ViewAvatar/ViewAvatar";

function Shop() {
  const user = useSelector(state => state.session.user);

  if (!user) return <Navigate to='/signup' replace={true} />;

  return (
    <>
      <ViewAvatar />
      <h1>Shop</h1>
    </>
  );
}

export default Shop;
