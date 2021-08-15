import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {updateIncentive} from '@api/endpoints'

interface Props {
  data: Incentive[];
}

export const Redeem: React.FC<Props> = ({ data }) => {
  let filteredData = data.filter(incentive => incentive.redeemed == false)
  const [redeemed, setRedeemed] = useState(false);
  const [redeemableIncentives, setRedeemableIncentives] = useState<Incentive[]>(filteredData)
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [randomIncentive, setRandomIncentive] = useState<Incentive>()

  const isFirstRender = useRef(true);
  
  const handleClickRedeem = async() => {
    let rand = redeemableIncentives[Math.floor(Math.random() * redeemableIncentives.length)]
    setRandomIncentive(rand)
    setRedeemed(true)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
    updateIncentiveRedemption()
  }, [randomIncentive])

  const updateIncentiveRedemption = async() =>{
    try {
      const incentive = await updateIncentive(randomIncentive.id, { redeemed: true })
      let remainingIncentives = redeemableIncentives.filter(i => i.id != incentive.id)
      setRedeemableIncentives(remainingIncentives)
      setMessage(`Your code is: ${randomIncentive.code}. Thanks for participating in our research!`)
    } catch (e) {
      console.log(e)
      setMessage('Ah dang, there\'s no more codes left, but try again later!');
    }
    setSaving(false);
  }

  // to handle when you first land on the page and there are no codes available
  if (!message) {setMessage('Ah dang, there\'s no more codes left, but try again later!')} 

  return (
    <div>
      <div className="pb-4">
          <button
            disabled={saving}
            className="hover:bg-gray-100 bg-green-200 rounded-md px-4 py-2"
            onClick={handleClickRedeem}
          >
            Redeem
          </button>
        </div>
      {redeemed && (
        <div className="py-4 text-green-600 italic">
          {message}
        </div>
      )}
    </div>
  );
};
