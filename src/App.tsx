// import { Outlet } from 'react-router-dom';
// import Nav from './components/Nav';

// function App() {
//   return (
//     <>
//       <Nav />
//       <main>
//         <Outlet />
//       </main>
//     </>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<CandidateSearch />} />
        <Route path="/saved" element={<SavedCandidates />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

