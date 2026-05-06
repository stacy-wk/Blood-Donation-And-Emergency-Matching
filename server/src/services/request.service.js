// src/services/request.service.js

import { findBestDonors } from "./donor.service.js";
import { HOSPITAL_LOCATION, REQUEST_STATUS } from "../constants/index.js";

/**
 * In-memory store (replace with Prisma later)
 */
const requests = [];

/**
 * Create a new emergency blood request
 */
export const createBloodRequest = ({
  hospitalId,
  bloodType,
  unitsNeeded,
  urgency,
  donors
}) => {
  if (!hospitalId || !bloodType || !unitsNeeded) {
    throw new Error("Missing required fields for blood request");
  }

  const requestId = `REQ-${Date.now()}`;

  // Find best matching donors
  const matchedDonors = findBestDonors(
    donors || [],
    bloodType,
    HOSPITAL_LOCATION
  );

  const newRequest = {
    id: requestId,
    hospitalId,
    bloodType,
    unitsNeeded,
    urgency: urgency || "MEDIUM",
    status: REQUEST_STATUS.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: null,

    matchedDonors,
    responses: []
  };

  requests.push(newRequest);

  return newRequest;
};

/**
 * Update request status
 */
export const updateRequestStatus = (requestId, status) => {
  const request = requests.find((r) => r.id === requestId);

  if (!request) {
    throw new Error("Request not found");
  }

  request.status = status;
  request.updatedAt = new Date().toISOString();

  return request;
};

/**
 * Get all requests
 */
export const getAllRequests = () => {
  return requests;
};

/**
 * Get request by ID
 */
export const getRequestById = (requestId) => {
  return requests.find((r) => r.id === requestId);
};

/**
 * Add donor response to request
 */
export const addDonorResponse = (requestId, donorId, response) => {
  const request = requests.find((r) => r.id === requestId);

  if (!request) {
    throw new Error("Request not found");
  }

  request.responses.push({
    donorId,
    response, // e.g. "ACCEPTED" | "DECLINED"
    timestamp: new Date().toISOString()
  });

  return request;
};