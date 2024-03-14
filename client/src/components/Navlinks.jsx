import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"
import { NavLink } from "react-router-dom"


const Navlinks = ({isBigSidebar}) => {
   const {toggleSidebar, user} = useDashboardContext()
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            // onclick logic is set so that if the isBigSidebar prop is passed then the toggleSidebar fucntion doesn;t get called onclicking the links. This is so big sidebar stays when links are pressed and small sidebar disappears when links are pressed   
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
export default Navlinks