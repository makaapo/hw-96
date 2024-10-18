import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Register from './features/User/Register';
import Login from './features/User/Login';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/User/userSlice';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import CocktailForm from './features/Cocktail/components/CocktailForm/CocktailForm';
import CocktailsPage from './features/Cocktail/CoctailsPage/CoctailsPage';
import CocktailsPageUser from './features/Cocktail/CoctailPageUser/CocktailsPageUser';
import OneCocktail from './features/Cocktail/OneCocktail/OneCocktail';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<CocktailsPage />} />
          <Route path="/cocktails/:id" element={<OneCocktail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cocktails/new"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <CocktailForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cocktails/my-сocktails"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <CocktailsPageUser />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
