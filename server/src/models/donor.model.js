export function createDonor({
  userId,
  bloodType,
  lastDonationDate,
  isEligible = true,
  location
}) {
  return {
    userId,
    bloodType,
    lastDonationDate,
    isEligible,
    location, // { lat, lng }
    createdAt: new Date().toISOString()
  };
}