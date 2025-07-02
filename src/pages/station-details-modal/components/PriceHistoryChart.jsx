import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PriceHistoryChart = ({ fuelType = 'Unleaded 91' }) => {
  const priceHistoryData = [
    { date: '15/11', price: 1.68, day: 'Mon' },
    { date: '16/11', price: 1.65, day: 'Tue' },
    { date: '17/11', price: 1.63, day: 'Wed' },
    { date: '18/11', price: 1.67, day: 'Thu' },
    { date: '19/11', price: 1.64, day: 'Fri' },
    { date: '20/11', price: 1.62, day: 'Sat' },
    { date: '21/11', price: 1.65, day: 'Sun' },
    { date: '22/11', price: 1.61, day: 'Mon' },
    { date: '23/11', price: 1.59, day: 'Tue' },
    { date: '24/11', price: 1.63, day: 'Wed' },
    { date: '25/11', price: 1.65, day: 'Thu' },
    { date: '26/11', price: 1.62, day: 'Fri' },
    { date: '27/11', price: 1.58, day: 'Sat' },
    { date: '28/11', price: 1.61, day: 'Sun' }
  ];

  const currentPrice = priceHistoryData[priceHistoryData.length - 1]?.price || 1.61;
  const previousPrice = priceHistoryData[priceHistoryData.length - 2]?.price || 1.58;
  const priceChange = currentPrice - previousPrice;
  const percentageChange = ((priceChange / previousPrice) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary">
            {data.day}, {label}
          </p>
          <p className="text-lg font-data font-semibold text-primary">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-text-muted">per litre</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Price History
          </h3>
          <p className="text-sm text-text-secondary">{fuelType} - Last 14 days</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <Icon 
              name={priceChange >= 0 ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={priceChange >= 0 ? 'text-error' : 'text-success'} 
            />
            <span className={`text-sm font-medium ${priceChange >= 0 ? 'text-error' : 'text-success'}`}>
              {priceChange >= 0 ? '+' : ''}${Math.abs(priceChange).toFixed(2)} ({percentageChange}%)
            </span>
          </div>
          <p className="text-xs text-text-muted">vs yesterday</p>
        </div>
      </div>

      <div className="bg-surface-secondary rounded-lg p-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistoryData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
              />
              <YAxis 
                domain={['dataMin - 0.05', 'dataMax + 0.05']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2, fill: 'var(--color-surface)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Price Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-surface-secondary rounded-lg text-center">
          <p className="text-xs text-text-muted uppercase tracking-wide">Lowest (14 days)</p>
          <p className="text-lg font-data font-semibold text-success">$1.58</p>
        </div>
        <div className="p-3 bg-surface-secondary rounded-lg text-center">
          <p className="text-xs text-text-muted uppercase tracking-wide">Highest (14 days)</p>
          <p className="text-lg font-data font-semibold text-error">$1.68</p>
        </div>
        <div className="p-3 bg-surface-secondary rounded-lg text-center">
          <p className="text-xs text-text-muted uppercase tracking-wide">Average</p>
          <p className="text-lg font-data font-semibold text-text-primary">$1.63</p>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;