import { useState, useEffect } from 'react';
import { formatTime } from '@/lib/utils';

interface RealTimeData {
  time: string;
  date: string;
  batteryLevel: number | null;
  batteryCharging: boolean;
}

export function useRealTimeData(): RealTimeData {
  const [time, setTime] = useState<string>(formatTime(new Date()));
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [batteryCharging, setBatteryCharging] = useState<boolean>(false);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(formatTime(now));
      setDate(now.toLocaleDateString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get battery status if available
  useEffect(() => {
    if ('getBattery' in navigator) {
      const getBatteryInfo = async () => {
        try {
          // @ts-ignore - Navigator battery API typings
          const battery = await navigator.getBattery();
          
          const updateBatteryInfo = () => {
            setBatteryLevel(Math.floor(battery.level * 100));
            setBatteryCharging(battery.charging);
          };
          
          // Update initial status
          updateBatteryInfo();
          
          // Add event listeners for changes
          battery.addEventListener('levelchange', updateBatteryInfo);
          battery.addEventListener('chargingchange', updateBatteryInfo);
          
          return () => {
            battery.removeEventListener('levelchange', updateBatteryInfo);
            battery.removeEventListener('chargingchange', updateBatteryInfo);
          };
        } catch (error) {
          console.error('Battery API error:', error);
        }
      };
      
      getBatteryInfo();
    }
  }, []);

  return {
    time,
    date,
    batteryLevel,
    batteryCharging
  };
}
