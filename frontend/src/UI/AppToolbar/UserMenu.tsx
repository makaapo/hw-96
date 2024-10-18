import React, { useState } from 'react';
import { Avatar, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useAppDispatch } from '../../app/hooks';
import { User } from '../../types';
import { API_URL } from '../../constants';
import { logout } from '../../features/User/usersThunks';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { getCocktails } from '../../features/Cocktail/cocktailsThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const imageUrl = user.avatar ? `${API_URL}/${user.avatar}` : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(getCocktails());
    navigate('/');
  };

  return (
    <Grid item>
      <Stack direction="row" alignItems="center">
        <IconButton sx={{ display: 'flex', gap: 1 }} disableRipple onClick={handleClick}>
          <Typography color="white">{user.displayName}</Typography>
          <Avatar alt="avatar" src={imageUrl} sx={{ width: 24, height: 24, display: 'inline-block' }} />
        </IconButton>
      </Stack>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem
          onClick={() => {
            navigate('/cocktails/my-сocktails');
          }}
        >
          <SentimentSatisfiedAltIcon sx={{ mr: 2 }} />
          My cocktails
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/cocktails/new');
          }}
        >
          <LocalBarIcon sx={{ mr: 2 }} />
          Add cocktail
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
