import { NotificationManager } from 'react-notifications'

export const onTagSave = (payload) =>
  NotificationManager.success(`${payload.name} has been updated.`)