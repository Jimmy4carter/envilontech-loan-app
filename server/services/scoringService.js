const calculateScore = (data) => {
  let score = 0;
  
  // Income scoring (0-40 points) - Nigerian Naira values
  if (data.income > 10000000) score += 40;        // > ₦10M
  else if (data.income > 5000000) score += 30;    // ₦5M-₦10M
  else if (data.income > 2000000) score += 20;    // ₦2M-₦5M
  else if (data.income > 1000000) score += 10;    // ₦1M-₦2M
  
  // Age scoring (0-20 points)
  if (data.age >= 25 && data.age <= 40) score += 20;
  else if (data.age > 40 && data.age <= 55) score += 15;
  else if (data.age > 55) score += 10;
  else score += 5; // 18-24
  
  // Nigerian high-income states
  const highIncomeStates = ['Lagos', 'Abuja', 'Rivers', 'Kano'];
  if (highIncomeStates.includes(data.state)) score += 10;
  else score += 5;
  
  // Nigerian education scoring (0-10 points)
  const educationPoints = {
    'PhD': 10,
    'Master': 8,
    'Bachelor': 6,
    'HND': 5,
    'OND': 4,
    'SSCE': 3,
    'Others': 2
  };
  score += educationPoints[data.education] || 0;
  
  // Nigerian employment status scoring (0-10 points)
  const employmentPoints = {
    'Employed': 10,
    'Self-Employed': 7,
    'NYSC': 5,
    'Student': 4,
    'Unemployed': 0
  };
  score += employmentPoints[data.employmentStatus] || 0;
  
  // Cap at 100
  return Math.min(score, 100);
};

module.exports = calculateScore;