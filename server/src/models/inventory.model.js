// Blood Bank Inventory
export function createInventoryItem({
  bloodType,
  quantity,
  expiryDate
}) {
  return {
    bloodType,
    quantity,
    expiryDate,
    lastUpdated: new Date().toISOString()
  };
}