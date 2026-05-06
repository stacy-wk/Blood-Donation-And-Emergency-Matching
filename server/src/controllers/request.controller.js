import {
  createBloodRequest,
  updateRequestStatus,
  getAllRequests,
  getRequestById,
  addDonorResponse
} from "../services/request.service.js";

export const createRequestController = (req, res) => {
  try {
    const result = createBloodRequest(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRequestsController = (req, res) => {
  res.json(getAllRequests());
};

export const getRequestByIdController = (req, res) => {
  const result = getRequestById(req.params.id);
  if (!result) return res.status(404).json({ error: "Not found" });
  res.json(result);
};

export const updateRequestStatusController = (req, res) => {
  try {
    const result = updateRequestStatus(req.params.id, req.body.status);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addDonorResponseController = (req, res) => {
  try {
    const result = addDonorResponse(
      req.params.id,
      req.body.donorId,
      req.body.response
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};