
import React, { useState } from 'react';
import { Role } from '../types';

interface SignUpFormProps {
  onSignUp: (characterName: string, role: Role) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [characterName, setCharacterName] = useState('');
  const [role, setRole] = useState<Role>('DPS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (characterName.trim()) {
      onSignUp(characterName, role);
      setCharacterName('');
      setRole('DPS');
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 mb-2">
        <div>
          <input
            type="text"
            placeholder="Character Name"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="wow-input"
            required
          />
        </div>
        <div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="wow-select"
          >
            <option value="Tank">Tank</option>
            <option value="Healer">Healer</option>
            <option value="DPS">DPS</option>
          </select>
        </div>
        <div className="col-span-2">
          <button type="submit" className="wow-button w-full">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
