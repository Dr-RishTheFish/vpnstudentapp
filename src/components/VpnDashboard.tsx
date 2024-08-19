import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, CircularProgress, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { useVpn } from '../contexts/VpnContext';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  status: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(4),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const VpnDashboard: React.FC = () => {
    const classes = useStyles();
    const { servers, isLoading, isConnected, currentServer, connect, disconnect, } = useVpn();
  
    if (isLoading) {
      return <CircularProgress />;
    }
  
   
    
  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Student VPN
      </Typography>
      <Typography variant="h6" className={classes.status}>
        Status: {isConnected ? `Connected to ${currentServer?.countryLong}` : 'Disconnected'}
      </Typography>
      <Button
        variant="contained"
        color={isConnected ? 'secondary' : 'primary'}
        onClick={isConnected ? disconnect : undefined}
        className={classes.button}
      >
        {isConnected ? 'Disconnect' : 'Select a server to connect'}
      </Button>
      <List className={classes.list}>
        {servers.map((server) => (
          <ListItem key={server.ip} button onClick={() => connect(server)} disabled={isConnected}>
            <ListItemText 
              primary={server.countryLong} 
              secondary={`Speed: ${server.speed} Mbps, Ping: ${server.ping} ms`} 
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => connect(server)}
                disabled={isConnected}
              >
                Connect
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default VpnDashboard;