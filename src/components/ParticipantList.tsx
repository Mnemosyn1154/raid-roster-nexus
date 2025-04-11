
import React from 'react';
import { Participant } from '../types';

interface ParticipantListProps {
  participants: Participant[];
  onRemoveParticipant: (id: string) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants, onRemoveParticipant }) => {
  // Function to determine role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Tank':
        return 'text-blue-300';
      case 'Healer':
        return 'text-green-400';
      case 'DPS':
        return 'text-red-400';
      default:
        return '';
    }
  };

  return (
    <div className="wow-frame mt-4">
      <h2 className="wow-header text-xl mb-3">Participant List</h2>
      <table className="wow-table mb-4">
        <thead>
          <tr>
            <th>Character Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.characterName}</td>
              <td className={getRoleColor(participant.role)}>{participant.role}</td>
              <td>
                <button 
                  onClick={() => onRemoveParticipant(participant.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {participants.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-wow-gold/70 py-4">
                No participants yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantList;
