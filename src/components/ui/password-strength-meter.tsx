'use client';

import { useState, useEffect } from 'react';
import { calculatePasswordStrength, getPasswordStrengthLabel } from '@/lib/auth/password-utils';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export function PasswordStrengthMeter({ password, className = '' }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('bg-gray-200');

  useEffect(() => {
    const score = calculatePasswordStrength(password);
    setStrength(score);
    setLabel(getPasswordStrengthLabel(score));
    
    // Update color based on strength
    if (score <= 1) setColor('bg-red-500');
    else if (score === 2) setColor('bg-orange-500');
    else if (score === 3) setColor('bg-yellow-500');
    else if (score === 4) setColor('bg-blue-500');
    else setColor('bg-green-500');
  }, [password]);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-sm font-medium text-gray-700">Password Strength</span>
        <span className="font-medium" style={{ color: color }}>{label}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${color}`} 
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Use at least 12 characters with a mix of letters, numbers & symbols
      </p>
    </div>
  );
}
