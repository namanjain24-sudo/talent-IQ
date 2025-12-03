import { protectRoute } from "./protectRoute.js";

// Alias for protectRoute to match the import in auth.route.js
const ensureAuthenticated = protectRoute;

export default ensureAuthenticated;