import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// import InboxIcon and MailIcon if you need them for the icons

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    // Clear browser memory (e.g., localStorage, sessionStorage)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to home page
    navigate('/');
  };

  const handleOptionClick = (option) => () => {
    setOpen(false); // Close the drawer
    if (option === 'Logout') {
      handleLogout();
    } if (option === 'Announcements') {
      // Redirect to announcements page
      navigate('/announcements');
    } if (option === 'Upcoming Events') {
      // Redirect to upcoming events page
      navigate('/events');
    } if (option === 'View Attendance') {
      // Redirect to view attendance page
      navigate('/attendance');
    } else {
      // Redirect to edit profile page
      navigate('/studentpage');
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Edit Profile', 'View Attendance', 'Upcoming Events', 'Announcements', 'Logout'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleOptionClick(text)}>
              <ListItemIcon>
                {/* Uncomment and replace with actual icons if needed */}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Additional list items or components can go here */}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Menu</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
