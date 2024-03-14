import Wrapper from "../assets/wrappers/BigSidebar";
import Navlinks from "./Navlinks";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container"
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>

          {/* isBigSidebar is a prop we are passing to Navlinks, if isBigSidebar is passed then NavLinks can know that it is being used in the bigsidebar where we don;t want the toggleSidebar function to be called as an onclick for each link. On thje smallsidebar we don't pass this prop so the togglesidebar function is called onclick for each link */}
          <Navlinks isBigSidebar={true} />
          
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
