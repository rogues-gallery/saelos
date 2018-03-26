import { NotificationManager } from 'react-notifications'

export const onOpportunitySave = (payload) =>
  NotificationManager.success(`${payload.name} has been updated.`)