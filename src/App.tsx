import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HealthChart } from './components/HealthChart';
import { WeightChart } from './components/WeightChart';
import { SymptomsChart } from './components/SymptomsChart';
import { DataEntry } from './components/DataEntry';
import { AuthForm } from './components/auth/AuthForm';
import { useAuth } from './hooks/useAuth';
import { HealthData } from './types/health';
import { TimeRange } from './types/timeRange';
import { fetchHealthData, addHealthEntry, deleteHealthEntry } from './lib/healthData';
import { DataPoint } from './components/DataPoint';

export default function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('1m');
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (user) {
        setDataLoading(true);
        try {
          const data = await fetchHealthData(user.id);
          setHealthData(data);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setDataLoading(false);
        }
      }
    }

    loadData();
  }, [user]);

  const handleNewEntry = async (data: HealthData) => {
    if (!user) throw new Error('You must be logged in to add entries');
    
    try {
      await addHealthEntry(user.id, data);
      const updatedData = await fetchHealthData(user.id);
      setHealthData(updatedData);
      setActiveTab('overview');
    } catch (error) {
      console.error('Error adding entry:', error);
      throw error;
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!user) return;
    
    try {
      await deleteHealthEntry(user.id, entryId);
      const updatedData = await fetchHealthData(user.id);
      setHealthData(updatedData);
    } catch (error) {
      console.error('Error deleting entry:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onSuccess={() => {}} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <HealthChart 
              data={healthData} 
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
            <WeightChart 
              data={healthData} 
              timeRange={timeRange}
            />
            <SymptomsChart 
              data={healthData} 
              timeRange={timeRange}
            />
            <div className="glass-card rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Recent Entries</h2>
              <div className="divide-y">
                {healthData
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map(entry => (
                    <DataPoint 
                      key={entry.id} 
                      data={entry} 
                      onDelete={handleDeleteEntry}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        );
      case 'entry':
        return <DataEntry onSubmit={handleNewEntry} />;
      case 'user':
        return (
          <div className="glass-card rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">User Profile</h2>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[--app-bg]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="lg:ml-64 p-4 lg:p-6 pt-16 lg:pt-6">
        {renderContent()}
      </main>
    </div>
  );
}