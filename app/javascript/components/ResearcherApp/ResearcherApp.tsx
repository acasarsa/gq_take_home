import * as React from 'react';
import { useEffect, useState } from 'react';
import { getIncentives } from '@api/endpoints';
import { IncentiveForm } from './IncentiveForm';

export const ResearcherApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Incentive[]>([]);

  useEffect(() => {
    getIncentives()
      .then(incentives => {
        setData(incentives);
        setLoading(false);
      });
  }, []);

// NOTES: 
// user should see all coupon codes currently set up √
// user should be able to update those codes √
// if code is redeemed make button say redeemed and/or grey it out so user can't update it anymore
// TODO: user should be able to create a new code - possibly create empty form with a button 

  return (
    <div className="px-12 py-6">
      <h1 className="text-2xl font-bold mb-6">Setup incentive</h1>
      <p className="mb-4">Enter the coupon code for the candidate to receive:</p>

      {loading && <span>Loading...</span>}

      {!loading && data.map((incentive, i) => 
        <IncentiveForm
          key={incentive.id}
          id={incentive.id}
          code={incentive.code}
          redeemed={incentive.redeemed}
        />
      )}
    </div>
  );
};
