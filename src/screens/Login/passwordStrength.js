import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrength = ({ password }) => {
  const testResult = zxcvbn(password);

  const createPassLabel = () => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUppercase && hasLowercase && hasNumber && hasSpecial) {
      return 'Strong';
    } else if (hasUppercase && hasLowercase && hasNumber) {
      return 'Good';
    } else if (hasUppercase && hasLowercase) {
      return 'Fair';
    } else if (hasUppercase || hasLowercase || hasNumber || hasSpecial) {
      return 'Weak';
    } else {
      return 'Very weak';
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${(testResult.score * 100) / 4}%`,
    background: funcProgressColor(),
    height: '7px',
  });

  return (
    <>
      <div className="progress" style={{ height: '7px' }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  );
};

export default PasswordStrength;
