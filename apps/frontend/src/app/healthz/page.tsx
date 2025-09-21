'use client';

import { useEffect, useState } from 'react';

interface HealthStatus {
  ok: boolean;
  timestamp: string;
  database?: string;
  service?: string;
  error?: string;
}

export default function HealthCheckPage() {
  const [backendStatus, setBackendStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/health`);
        const data = await response.json();
        setBackendStatus(data);
      } catch (error) {
        setBackendStatus({
          ok: false,
          timestamp: new Date().toISOString(),
          error: 'Backend connection failed'
        });
      } finally {
        setLoading(false);
      }
    };

    checkBackendHealth();
  }, []);

  const StatusIndicator = ({ status }: { status: boolean }) => (
    <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`} />
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">System Health Check</h1>
        
        <div className="space-y-6">
          {/* Frontend Status */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <StatusIndicator status={true} />
              <h2 className="text-xl font-semibold">Frontend (Next.js)</h2>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Status: ✅ Online</p>
              <p>Framework: Next.js 14</p>
              <p>Environment: {process.env.NODE_ENV || 'development'}</p>
            </div>
          </div>

          {/* Backend Status */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <StatusIndicator status={backendStatus?.ok || false} />
              <h2 className="text-xl font-semibold">Backend API</h2>
            </div>
            
            {loading ? (
              <p className="text-sm text-muted-foreground">Checking backend status...</p>
            ) : (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Status: {backendStatus?.ok ? '✅ Online' : '❌ Offline'}</p>
                {backendStatus?.service && (
                  <p>Service: {backendStatus.service}</p>
                )}
                {backendStatus?.database && (
                  <p>Database: {backendStatus.database}</p>
                )}
                {backendStatus?.error && (
                  <p className="text-red-500">Error: {backendStatus.error}</p>
                )}
                <p>Last Check: {backendStatus?.timestamp}</p>
              </div>
            )}
          </div>

          {/* API Configuration */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Backend URL: {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
}