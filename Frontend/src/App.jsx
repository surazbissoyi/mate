import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Common/Footer";
import Navbar from "./components/Common/Navbar";
import Homepage from "./pages/Homepage";
import PlaceDetails from "./pages/PlaceDetails";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfileDetails from './pages/ProfileDetails';
import ListYourself from './pages/ListYourself';
import AddProperty from './pages/AddProperty';
import SearchResults from './pages/SearchResults';
import Account from './pages/Account';

export default function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/listyourself" element={<ListYourself />} />
          <Route path="/listproperty" element={<AddProperty />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path='/account' element={<Account/>}/>
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}
