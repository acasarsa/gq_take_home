import * as React from 'react';
import { useState} from 'react';
import { updateIncentive, createIncentive} from '@api/endpoints';

interface Props {
  code?: string;
  redeemed?: boolean;
  id?: number;
  handleAddNewIncentive?: (incentive: any) => void;
}

export const IncentiveForm: React.FC<Props> = ({ id, code, redeemed, handleAddNewIncentive}) => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = code ? useState(code) : useState('');
  const [isRedeemed, setIsRedeemed] = useState(redeemed)

  async function handleClickSave() {
    setSaving(true);
    const incentive = id ? await updateIncentive(id, { code: inputValue }) : await createIncentive({ code: inputValue })

    id ? setInputValue(inputValue) : setInputValue('')

    if (incentive) {
      setMessage('Successfully updated!');
      setTimeout(() => setMessage(''), 2000);
      id ? null : handleAddNewIncentive(incentive)
    } else if (inputValue.length == 0 || !inputValue.trim()) {
      setMessage('Incentive code cannot be blank!');
    } else {
      setMessage('An error ocurred');
    }
    setSaving(false);
  }

  const renderButton = () => {
    if (isRedeemed == false || isRedeemed == null) {
      return (
        <button
          disabled={saving}
          className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2"
          onClick={handleClickSave}
      >
        {id ? "Update" : "Add New Incentive"}
      </button>
      ) 
    } else {
      return (
        <div
        className="bg-gray-200 rounded-md px-4 py-2 text-red-600"
      >
        Redeemed!
      </div>
      ) 
    }
  }

  return (
    <div>
      <div className="flex space-x-2 pb-4">
        <input
          disabled={saving || isRedeemed == true}
          className="text-xl border"
          type="text"
          name="incentive_code"
          value={inputValue}
          onChange={e => setInputValue(e.currentTarget.value)}
        />
        {renderButton()}
      </div>
      {message && <div className="text-gray-600 italic">{message}</div>}
    </div>
  );
};
