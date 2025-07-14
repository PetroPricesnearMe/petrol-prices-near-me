import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-secondary-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-5 bg-secondary-200 rounded w-48"></div>
            <div className="h-4 bg-secondary-200 rounded w-32"></div>
            <div className="h-3 bg-secondary-200 rounded w-56"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-secondary-200 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 lg:p-6 space-y-6">
        {/* Fuel Prices Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-secondary-200 rounded w-40"></div>
            <div className="h-4 bg-secondary-200 rounded w-20"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="p-4 bg-surface-secondary rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary-200 rounded w-24"></div>
                    <div className="h-3 bg-secondary-200 rounded w-32"></div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="h-6 bg-secondary-200 rounded w-16"></div>
                    <div className="h-3 bg-secondary-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Station Info Skeleton */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-secondary-200 rounded mt-1"></div>
              <div className="space-y-1">
                <div className="h-4 bg-secondary-200 rounded w-64"></div>
                <div className="h-3 bg-secondary-200 rounded w-48"></div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-secondary-200 rounded"></div>
              <div className="h-4 bg-secondary-200 rounded w-32"></div>
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div>
            <div className="h-5 bg-secondary-200 rounded w-32 mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-6 bg-secondary-200 rounded-full w-20"></div>
              ))}
            </div>
          </div>

          {/* Expandable Sections Skeleton */}
          <div className="space-y-2">
            {[1, 2].map((item) => (
              <div key={item} className="border border-border rounded-lg">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-secondary-200 rounded"></div>
                    <div className="h-4 bg-secondary-200 rounded w-32"></div>
                  </div>
                  <div className="w-4 h-4 bg-secondary-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-6 bg-secondary-200 rounded w-32"></div>
              <div className="h-4 bg-secondary-200 rounded w-48"></div>
            </div>
            <div className="text-right space-y-1">
              <div className="h-4 bg-secondary-200 rounded w-24"></div>
              <div className="h-3 bg-secondary-200 rounded w-20"></div>
            </div>
          </div>
          <div className="bg-surface-secondary rounded-lg p-4">
            <div className="h-64 bg-secondary-200 rounded"></div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-10 bg-secondary-200 rounded-lg"></div>
            <div className="h-10 bg-secondary-200 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-8 bg-secondary-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;