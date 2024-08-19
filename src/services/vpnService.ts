import axios from 'axios';

export interface VpnServer {
  hostName: string;
  ip: string;
  score: number;
  ping: number;
  speed: number;
  countryLong: string;
  countryShort: string;
  numVpnSessions: number;
  uptime: number;
  totalUsers: number;
  totalTraffic: string;
  logType: string;
  operator: string;
  message: string;
  openVPNConfigDataBase64: string;
}

class VpnService {
    private baseUrl = '/api/iphone/';

  async getServers(): Promise<VpnServer[]> {
    try {
        console.log('Fetching servers...');
        const response = await axios.get(this.baseUrl);
        console.log('Response received:', response.data);
    const csvData = response.data as string;
    const rows = csvData.split('\n').slice(2, -2); 
    
    return rows.map(row => {
      const [
        hostName, ip, score, ping, speed, countryLong, countryShort,
        numVpnSessions, uptime, totalUsers, totalTraffic, logType,
        operator, message, openVPNConfigDataBase64
      ] = row.split(',');

      return {
        hostName, ip, score: Number(score), ping: Number(ping),
        speed: Number(speed), countryLong, countryShort,
        numVpnSessions: Number(numVpnSessions), uptime: Number(uptime),
        totalUsers: Number(totalUsers), totalTraffic, logType,
        operator, message, openVPNConfigDataBase64
      };
    });
} catch (error) {
    console.error('Error fetching servers:', error);
    throw error;
  }
  }

  // Simulated connect method
  async connect(server: VpnServer): Promise<void> {
    console.log(`Connecting to ${server.countryLong}...`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate connection delay
    console.log(`Connected to ${server.countryLong}`);
  }

  // Simulated disconnect method
  async disconnect(): Promise<void> {
    console.log('Disconnecting...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate disconnection delay
    console.log('Disconnected');
  }
}

export default new VpnService();