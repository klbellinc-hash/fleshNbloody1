const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Simple email validation regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Example safe destination
const SAFE_DESTINATION = "https://yourdomain.com/welcome";

// Gateway route
app.get("/gateway", (req, res) => {
  const email = req.query.email;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Optional: log email safely (never log sensitive production data carelessly)
  console.log("Valid email received:", email);

  // Example: attach email as encoded param
  const redirectUrl = `${SAFE_DESTINATION}?email=${encodeURIComponent(email)}`;

  res.redirect(302, redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});