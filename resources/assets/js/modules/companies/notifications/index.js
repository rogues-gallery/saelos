import { NotificationManager } from 'react-notifications'

export const onCompanySave = (payload) =>
  NotificationManager.success(`${payload.name} has been updated.`)