import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  const location = useLocation().pathname.slice(1);

  return (
    <>
      <Nav location={location} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
