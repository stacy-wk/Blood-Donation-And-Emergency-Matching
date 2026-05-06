import { BLOOD_TYPES } from "../constants/index.js";

/**
 * In-memory store (replace later with DB)
 */
let inventory = {
  "A+": { quantityMl: 10000, thresholdMl: 5000 },
  "A-": { quantityMl: 10000, thresholdMl: 5000 },
  "B+": { quantityMl: 10000, thresholdMl: 5000 },
  "B-": { quantityMl: 10000, thresholdMl: 5000 },
  "AB+": { quantityMl: 10000, thresholdMl: 5000 },
  "AB-": { quantityMl: 10000, thresholdMl: 5000 },
  "O+": { quantityMl: 10000, thresholdMl: 5000 },
  "O-": { quantityMl: 10000, thresholdMl: 5000 }
};

/**
 * Get full inventory
 */
export const getInventory = async () => {
  return inventory;
};

/**
 * Get stock for one blood type
 */
export const getBloodTypeStock = async (bloodType) => {
  if (!inventory[bloodType]) {
    throw new Error(`Invalid blood type: ${bloodType}`);
  }

  return inventory[bloodType];
};

/**
 * Add stock
 */
export const addStock = async (bloodType, amountMl) => {
  if (!inventory[bloodType]) {
    throw new Error(`Invalid blood type: ${bloodType}`);
  }

  if (amountMl <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  inventory[bloodType].quantityMl += amountMl;

  return inventory[bloodType];
};

/**
 * Use stock
 */
export const useStock = async (bloodType, amountMl) => {
  if (!inventory[bloodType]) {
    throw new Error(`Invalid blood type: ${bloodType}`);
  }

  if (amountMl <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (inventory[bloodType].quantityMl < amountMl) {
    throw new Error("Insufficient blood stock");
  }

  inventory[bloodType].quantityMl -= amountMl;

  return inventory[bloodType];
};

/**
 * Update threshold
 */
export const updateThreshold = async (bloodType, thresholdMl) => {
  if (!inventory[bloodType]) {
    throw new Error(`Invalid blood type: ${bloodType}`);
  }

  if (thresholdMl < 0) {
    throw new Error("Threshold cannot be negative");
  }

  inventory[bloodType].thresholdMl = thresholdMl;

  return inventory[bloodType];
};

/**
 * Low stock alerts
 */
export const getLowStockAlerts = async () => {
  const alerts = [];

  for (const type of BLOOD_TYPES) {
    const item = inventory[type];

    if (item.quantityMl <= item.thresholdMl) {
      alerts.push({
        bloodType: type,
        quantityMl: item.quantityMl,
        thresholdMl: item.thresholdMl,
        severity:
          item.quantityMl === 0
            ? "CRITICAL"
            : item.quantityMl < item.thresholdMl * 0.5
            ? "HIGH"
            : "MEDIUM"
      });
    }
  }

  return alerts;
};

/**
 * Check availability
 */
export const isStockAvailable = async (bloodType, requiredMl) => {
  if (!inventory[bloodType]) {
    throw new Error(`Invalid blood type: ${bloodType}`);
  }

  return inventory[bloodType].quantityMl >= requiredMl;
};

/**
 * Reset (testing only)
 */
export const _resetInventory = () => {
  inventory = Object.fromEntries(
    BLOOD_TYPES.map((type) => [
      type,
      { quantityMl: 10000, thresholdMl: 5000 }
    ])
  );
};