import React, { createContext, useState, useContext, useEffect } from 'react';
import vpnService, { VpnServer } from '../services/vpnService';

interface VpnContextType {
  servers: VpnServer[];
  isLoading: boolean;
  isConnected: boolean;
  currentServer: VpnServer | null;
  connect: (server: VpnServer) => Promise<void>;
  disconnect: () => Promise<void>;
}

const VpnContext = createContext<VpnContextType | undefined>(undefined);

export const VpnProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [servers, setServers] = useState<VpnServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [currentServer, setCurrentServer] = useState<VpnServer | null>(null);

  useEffect(() => {
    loadServers();
  }, []);

  const [error, setError] = useState<string | null>(null);

  const loadServers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedServers = await vpnService.getServers();
      setServers(fetchedServers);
    } catch (error) {
      console.error('Failed to load servers:', error);
      setError('Failed to load servers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const connect = async (server: VpnServer) => {
    setIsLoading(true);
    try {
      await vpnService.connect(server);
      setIsConnected(true);
      setCurrentServer(server);
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    setIsLoading(true);
    try {
      await vpnService.disconnect();
      setIsConnected(false);
      setCurrentServer(null);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VpnContext.Provider value={{ servers, isLoading, isConnected, currentServer, connect, disconnect,}}>
      {children}
    </VpnContext.Provider>
  );
};

export const useVpn = () => {
  const context = useContext(VpnContext);
  if (context === undefined) {
    throw new Error('useVpn must be used within a VpnProvider');
  }
  return context;
};