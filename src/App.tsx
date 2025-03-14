import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Forum } from './pages/Forum';
import { ThreadPage } from './pages/ThreadPage';
import { Store } from './pages/Store';
import { LabelPage } from './pages/LabelPage';
import { ArtistPage } from './pages/ArtistPage';
import { Events } from './pages/Events';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Community } from './pages/Community';
import { MerchandisePage } from './pages/Merchandise';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum/:id" element={<ThreadPage />} />
          <Route path="store" element={<Store />} />
          <Route path="store/label/:id" element={<LabelPage />} />
          <Route path="store/label/:labelId/artist/:artistId" element={<ArtistPage />} />
          <Route path="store/merchandise" element={<MerchandisePage />} />
          <Route path="events" element={<Events />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;