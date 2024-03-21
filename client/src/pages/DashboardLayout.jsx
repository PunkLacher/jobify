import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar, Loading } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";


const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  }
}



export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({queryClient}) => {
  //get currentuser from loader
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();

  //for loader spinner
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    //this simple changes darktheme state from true to not true
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    //vanilla js used to toggle the html body css class
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logout Successful");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
