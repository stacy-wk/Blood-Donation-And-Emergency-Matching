// server/services/notification.service.js

import { addDonorResponse } from "./request.service.js";

const notificationLogs = [];

const NOTIFICATION_STATUS = {
  SENT: "SENT",
  FAILED: "FAILED",
  REPLIED: "REPLIED"
};

/**
 * Simulate sending SMS to donor
 * (Later replace with Twilio / Firebase / WhatsApp API)
 */
export const sendSMS = async (phone, message) => {
  try {
    // simulate network delay
    await new Promise((resolve) =>
      setTimeout(resolve, 300 + Math.random() * 700)
    );

    console.log(`📩 SMS sent to ${phone}: ${message}`);

    return {
      success: true,
      status: NOTIFICATION_STATUS.SENT
    };
  } catch (err) {
    return {
      success: false,
      status: NOTIFICATION_STATUS.FAILED
    };
  }
};

/**
 * Notify a single donor
 */
export const notifyDonor = async ({
  donor,
  requestId,
  message
}) => {
  if (!donor?.phone) return null;

  const result = await sendSMS(donor.phone, message);

  const log = {
    id: `NOTIF-${Date.now()}-${donor.id}`,
    donorId: donor.id,
    requestId,
    phone: donor.phone,
    message,
    status: result.status,
    timestamp: new Date().toISOString()
  };

  notificationLogs.push(log);

  return log;
};

/**
 * Notify multiple donors (bulk emergency broadcast)
 */
export const notifyDonorsBulk = async ({
  donors,
  requestId,
  bloodType
}) => {
  const message = `URGENT: Blood donation needed (${bloodType}). Nairobi Referral Hospital requires immediate assistance. Please respond ASAP.`;

  const results = [];

  for (const donor of donors) {
    const log = await notifyDonor({
      donor,
      requestId,
      message
    });

    if (log) results.push(log);
  }

  return results;
};

/**
 * Handle donor response (simulation layer)
 */
export const handleDonorResponse = (
  requestId,
  donorId,
  responseText
) => {
  console.log(
    `💬 Response from ${donorId}: ${responseText}`
  );

  // attach response to request system
  addDonorResponse(requestId, donorId, responseText);

  const log = {
    id: `RESP-${Date.now()}`,
    donorId,
    requestId,
    response: responseText,
    status: NOTIFICATION_STATUS.REPLIED,
    timestamp: new Date().toISOString()
  };

  notificationLogs.push(log);

  return log;
};

/**
 * Get all notification logs
 */
export const getNotificationLogs = () => {
  return notificationLogs;
};