import { Outlet } from 'react-router-dom'
// Outlet component makes it so whatever content in child pages is displayed in the Outlet component
//Since pages are children of HomeLayout, HomeLayout acts as a 'layout' rather than page, i.e. displays its content on all child pages contained in Outlet.
//whatever elements you set around the <Outlet/> will be displayed in all children pages

const HomeLayout = () => {
  return (
    <>
          <Outlet />
    </>
  );
};
export default HomeLayout;
