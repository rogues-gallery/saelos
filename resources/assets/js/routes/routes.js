import contactRoutes from "../modules/contacts/routes"
import authRoutes from "../modules/auth/routes"
import companyRoutes from "../modules/companies/routes"
import opportunityRoutes from "../modules/opportunities/routes"
import reportRoutes from "../modules/reports/routes"
import workflowRoutes from "../modules/workflows/routes"
import teamRoutes from "../modules/teams/routes"
import hqRoutes from "../modules/headquarters/routes"

import fieldRoutes from "../modules/fields/routes"
import configRoutes from "../modules/config/routes"
import stageRoutes from "../modules/stages/routes"
import statusRoutes from "../modules/statuses/routes"

export default [
  ...contactRoutes,
  ...authRoutes,
  ...companyRoutes,
  ...opportunityRoutes,
  ...reportRoutes,
  ...workflowRoutes,
  ...teamRoutes,
  ...hqRoutes,

  ...fieldRoutes,
  ...configRoutes,
  ...stageRoutes,
  ...statusRoutes,
];