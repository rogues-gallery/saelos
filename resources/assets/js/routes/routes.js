import contactRoutes from "../modules/contacts/routes";
import authRoutes from "../modules/auth/routes";
import accountRoutes from "../modules/accounts/routes";
import opportunityRoutes from "../modules/opportunities/routes";
import reportRoutes from "../modules/reports/routes";
import workflowRoutes from "../modules/workflows/routes";

export default [
  ...contactRoutes,
  ...authRoutes,
  ...accountRoutes,
  ...opportunityRoutes,
  ...reportRoutes,
  ...workflowRoutes
];