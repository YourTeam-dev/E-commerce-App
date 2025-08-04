import HistoricAPI from '../API/Historic';

class HistoricService {
  // Centralized historic tracking with error handling and validation
  static async createHistoricRecord(userId, action, title, description, metadata = {}) {
    if (!userId || !action || !title) {
      throw new Error('Missing required fields: userId, action, or title');
    }

    const validActions = ['ADD', 'UPDATE', 'DELETE', 'COMMENT', 'REVIEW', 'VALIDATE'];
    if (!validActions.includes(action)) {
      throw new Error(`Invalid action: ${action}. Must be one of: ${validActions.join(', ')}`);
    }

    try {
      const response = await HistoricAPI.createHistoric({
        userId,
        title,
        action,
        discription: description,
        ...metadata
      });
      
      return response;
    } catch (error) {
      console.error('Historic service error:', error);
      throw error;
    }
  }

  // Batch historic creation for bulk operations
  static async createBatchHistoric(records) {
    const results = [];
    
    for (const record of records) {
      try {
        const result = await this.createHistoricRecord(
          record.userId,
          record.action,
          record.title,
          record.description,
          record.metadata
        );
        results.push({ success: true, data: result });
      } catch (error) {
        results.push({ success: false, error: error.message });
      }
    }
    
    return results;
  }

  // Get historic with pagination and filtering
  static async getHistoricWithFilters(filters = {}) {
    const {
      userId,
      action,
      startDate,
      endDate,
      page = 1,
      limit = 20
    } = filters;

    let historic = [];
    
    try {
      if (userId) {
        const response = await HistoricAPI.getUserHistoric(userId);
        historic = response.data || [];
      } else {
        const response = await HistoricAPI.getAllHistoric();
        historic = response.data || [];
      }

      // Apply filters
      if (action) {
        historic = historic.filter(item => item.action === action);
      }

      if (startDate) {
        historic = historic.filter(item => new Date(item.createdAt) >= new Date(startDate));
      }

      if (endDate) {
        historic = historic.filter(item => new Date(item.createdAt) <= new Date(endDate));
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return {
        data: historic.slice(startIndex, endIndex),
        total: historic.length,
        page,
        pages: Math.ceil(historic.length / limit)
      };
    } catch (error) {
      console.error('Error fetching historic with filters:', error);
      throw error;
    }
  }

  // Analytics and insights
  static async getHistoricAnalytics(userId = null) {
    try {
      const historic = await this.getHistoricWithFilters({ userId });
      
      const analytics = {
        total: historic.total,
        byAction: {},
        byDate: {},
        recentActivity: historic.data.slice(0, 10)
      };

      // Group by action
      historic.data.forEach(item => {
        analytics.byAction[item.action] = (analytics.byAction[item.action] || 0) + 1;
      });

      // Group by date (daily)
      historic.data.forEach(item => {
        const date = new Date(item.createdAt).toISOString().split('T')[0];
        analytics.byDate[date] = (analytics.byDate[date] || 0) + 1;
      });

      return analytics;
    } catch (error) {
      console.error('Error getting historic analytics:', error);
      throw error;
    }
  }
}

export default HistoricService;
