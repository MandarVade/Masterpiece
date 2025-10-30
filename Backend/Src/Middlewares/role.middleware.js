export const verifyBuyer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: Please login" });
  }

  if (req.user.role !== "buyer") {
    return res.status(403).json({ message: "Forbidden: Only buyers can perform this action" });
  }

  next();
};

export const verifySeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: Please login" });
  }

  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden: Only sellers can perform this action" });
  }

  next();
};

export const verifyBuyerOrSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: Please login" });
  }

  if (req.user.role !== "buyer" && req.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden: Only buyers or sellers can perform this action" });
  }

  next();
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: Please login" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Only admins can perform this action" });
  }

  next();
};
