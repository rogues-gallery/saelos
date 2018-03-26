import { NotificationManager } from 'react-notifications'

export const onContactSave = (payload) =>
  NotificationManager.success(`${payload.first_name} ${payload.last_name} has been updated.`)