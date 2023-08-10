import { Outlet } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return(
    <>
      <Header />
      <main>
        <Outlet />  {/*This is the equivalent to props.children; It's a placeholder for any children components that will be placed/rendered between the opening and closing tags of the Layout component when the url paths match*/}
      </main>
      <Footer />
    </>
  );
};