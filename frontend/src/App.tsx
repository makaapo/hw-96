import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Register from './features/User/Register';
import Login from './features/User/Login';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/User/userSlice';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import CocktailForm from './features/Cocktail/components/CocktailForm/CocktailForm';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Typography variant="h1">Home</Typography>} />
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
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
