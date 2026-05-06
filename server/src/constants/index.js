// server/src/constants/index.js

export const BLOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];

export const REQUEST_STATUS = {
  PENDING: "PENDING",
  MATCHED: "MATCHED",
  FULFILLED: "FULFILLED",
  CANCELLED: "CANCELLED"
};

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED"
};


// ✅ ADD THIS
export const HOSPITAL_LOCATION = {
  lat: -1.2921,
  lng: 36.8219,
  name: "Main Referral Hospital"
};

// 🔥 ADD THIS (IMPORTANT)
export const BLOOD_COMPATIBILITY = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "AB-": ["A-", "B-", "AB-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"]
};