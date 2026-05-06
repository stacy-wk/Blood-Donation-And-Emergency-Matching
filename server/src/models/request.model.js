// Blood request (Hospital side)
export function createRequest({
  id,
  hospitalId,
  bloodType,
  quantity,
  urgency,
  status = 'PENDING'
}) {
  return {
    id,
    hospitalId,
    bloodType,
    quantity,
    urgency, // HIGH, MEDIUM, LOW
    status,  // PENDING, FULFILLED, CANCELLED
    createdAt: new Date().toISOString()
  };
}