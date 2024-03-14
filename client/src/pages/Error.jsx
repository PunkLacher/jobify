import { Link, useRouteError } from "react-router-dom";
//useRouteError is a hook to get all the error info from React
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  //check for 404 status, then return custom 404 page, if not, retrun generic error page
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Page not Found!</h3>
          <p>We can&apos;t seem to find the page you are looking for.</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    );
    //if not 404 return generic error page
  }
  return (
    <Wrapper>
      <div>
        <h3>Somerthing went wrong!</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
