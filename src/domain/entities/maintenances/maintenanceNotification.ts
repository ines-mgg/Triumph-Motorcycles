export class MaintenanceNotification {
  constructor(
    public recipientId: string,
    public message: string,
    public date: Date,
    public type: 'StockAlert' | 'ServiceReminder' | 'IncidentReport',
    public isRead: boolean = false,
  ) {}

  markAsRead(): void {
    this.isRead = true;
  }
}
