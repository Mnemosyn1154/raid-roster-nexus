
import React, { useState, useEffect } from 'react';
import { Role, WoWClass, wowSpecs } from '../types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SignUpFormProps {
  onSignUp: (characterName: string, role: Role, wowClass: WoWClass, specialization: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [characterName, setCharacterName] = useState('');
  const [role, setRole] = useState<Role>('DPS');
  const [wowClass, setWowClass] = useState<WoWClass>('Warrior');
  const [specialization, setSpecialization] = useState<string>(wowSpecs['Warrior'][0]);
  const [availableSpecs, setAvailableSpecs] = useState<string[]>(wowSpecs['Warrior']);

  // Update available specializations when class changes
  useEffect(() => {
    setAvailableSpecs(wowSpecs[wowClass]);
    setSpecialization(wowSpecs[wowClass][0]);
  }, [wowClass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (characterName.trim()) {
      onSignUp(characterName, role, wowClass, specialization);
      setCharacterName('');
      setRole('DPS');
      setWowClass('Warrior');
      setSpecialization(wowSpecs['Warrior'][0]);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <input
              type="text"
              placeholder="Character Name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="wow-input w-full"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-wow-gold/80 mb-1">Class</label>
              <Select 
                value={wowClass} 
                onValueChange={(value) => setWowClass(value as WoWClass)}
              >
                <SelectTrigger className="wow-select">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(wowSpecs).map((classname) => (
                    <SelectItem key={classname} value={classname}>
                      {classname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-wow-gold/80 mb-1">Specialization</label>
              <Select 
                value={specialization} 
                onValueChange={setSpecialization}
              >
                <SelectTrigger className="wow-select">
                  <SelectValue placeholder="Select spec" />
                </SelectTrigger>
                <SelectContent>
                  {availableSpecs.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-wow-gold/80 mb-2">Role</label>
            <RadioGroup 
              value={role} 
              onValueChange={(value) => setRole(value as Role)} 
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Tank" id="tank" className="text-wow-gold/80" />
                <Label htmlFor="tank" className="text-wow-gold/80">Tank</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Healer" id="healer" className="text-wow-gold/80" />
                <Label htmlFor="healer" className="text-wow-gold/80">Healer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DPS" id="dps" className="text-wow-gold/80" />
                <Label htmlFor="dps" className="text-wow-gold/80">DPS</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div>
          <button type="submit" className="wow-button w-full">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
