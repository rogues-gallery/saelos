import contactRoutes from "../modules/contacts/routes";
import authRoutes from "../modules/auth/routes";
import companyRoutes from "../modules/companies/routes";
import opportunityRoutes from "../modules/opportunities/routes";
import analyticsRoutes from "../modules/analytics/routes";
import teamRoutes from "../modules/teams/routes";
import hqRoutes from "../modules/headquarters/routes";

import fieldRoutes from "../modules/fields/routes";
import configRoutes from "../modules/config/routes";
import stageRoutes from "../modules/stages/routes";
import statusRoutes from "../modules/statuses/routes";
import tagRoutes from "../modules/tags/routes";
import usersRoutes from "../modules/users/routes";
import importRoutes from "../modules/imports/routes";

export default [
  ...contactRoutes,
  ...hqRoutes,
  ...companyRoutes,
  ...opportunityRoutes,
  ...analyticsRoutes,

  ...authRoutes,
  ...configRoutes,
  ...fieldRoutes,
  ...tagRoutes,
  ...stageRoutes,
  ...statusRoutes,
  ...teamRoutes,
  ...usersRoutes,
  ...importRoutes
];
