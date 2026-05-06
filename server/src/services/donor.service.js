// server/src/services/donor.service.js

import { calculateDistance } from "../utils/geoUtils.js";
import { BLOOD_COMPATIBILITY } from "../constants/index.js";

/**
 * TEMP STORAGE (until Prisma DB is added)
 */
let donorsDB = [];

/**
 * Seed donors (for testing / initial load)
 */
export const seedDonors = (initialDonors) => {
  donorsDB = initialDonors;
};

/**
 * Get all donors
 */
export const getDonors = () => {
  return donorsDB;
};

/**
 * Update donor
 */
export const updateDonor = (id, updates) => {
  const index = donorsDB.findIndex(d => d.id === id);

  if (index === -1) {
    throw new Error("Donor not found");
  }

  donorsDB[index] = {
    ...donorsDB[index],
    ...updates
  };

  return donorsDB[index];
};

/* =========================
   BUSINESS LOGIC (CORE)
========================= */

const COOLDOWN_DAYS = 90;

const isEligibleDonor = (donor) => {
  if (!donor) return false;
  if (donor.isActive === false) return false;

  if (!donor.lastDonationDate) return true;

  const lastDonation = new Date(donor.lastDonationDate);
  const now = new Date();

  const diffMs = now - lastDonation;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= COOLDOWN_DAYS;
};

export const getEligibleDonors = (donors, recipientBloodType) => {
  if (!Array.isArray(donors)) return [];

  const compatibleTypes = BLOOD_COMPATIBILITY?.[recipientBloodType] || [];

  return donors.filter((donor) => {
    return (
      compatibleTypes.includes(donor.bloodType) &&
      isEligibleDonor(donor)
    );
  });
};

export const rankDonorsByDistance = (donors, hospitalLocation) => {
  if (!Array.isArray(donors)) return [];

  if (!hospitalLocation?.lat || !hospitalLocation?.lng) {
    return donors;
  }

  return donors
    .map((donor) => {
      if (!donor.lat || !donor.lng) {
        return { ...donor, distanceKm: Infinity };
      }

      const distance = calculateDistance(
        hospitalLocation.lat,
        hospitalLocation.lng,
        donor.lat,
        donor.lng
      );

      return {
        ...donor,
        distanceKm: distance
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
};

export const findBestDonors = (
  donors,
  recipientBloodType,
  hospitalLocation
) => {
  const eligibleDonors = getEligibleDonors(
    donors,
    recipientBloodType
  );

  return rankDonorsByDistance(
    eligibleDonors,
    hospitalLocation
  );
};