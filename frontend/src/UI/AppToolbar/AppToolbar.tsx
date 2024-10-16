import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import { selectUser } from '../../features/User/userSlice';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{ mb: 2 }} color="secondary">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/">Coctails</StyledLink>
            </Typography>
          </Grid>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
