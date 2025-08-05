import HistoricService from '../services/historic.service';

class HistoricTracker {
  // Track product lifecycle events
  static async trackProductLifecycle(userId, action, productData) {
    const actions = {
      CREATE: {
        title: 'Product Created',
        description: `Created product: ${productData.name} - $${productData.price}`
      },
      UPDATE: {
        title: 'Product Updated',
        description: `Updated product: ${productData.name} - Changed: ${productData.changes || 'details'}`
      },
      DELETE: {
        title: 'Product Deleted',
        description: `Deleted product: ${productData.name}`
      },
      STOCK_UPDATE: {
        title: 'Stock Updated',
        description: `Updated stock for ${productData.name}: ${productData.stock} units`
      },
      PRICE_CHANGE: {
        title: 'Price Changed',
        description: `Changed price for ${productData.name}: $${productData.oldPrice} → $${productData.newPrice}`
      }
    };

    const actionData = actions[action];
    if (!actionData) {
      throw new Error(`Invalid product action: ${action}`);
    }

    return HistoricService.createHistoricRecord(
      userId,
      action === 'CREATE' ? 'ADD' : action === 'DELETE' ? 'DELETE' : 'UPDATE',
      actionData.title,
      actionData.description
    );
  }

  // Track order lifecycle events
  static async trackOrderLifecycle(userId, action, orderData) {
    const actions = {
      PLACED: {
        title: 'Order Placed',
        description: `Order #${orderData.orderNumber} placed - Total: $${orderData.total}`
      },
      CANCELLED: {
        title: 'Order Cancelled',
        description: `Order #${orderData.orderNumber} cancelled`
      },
      DELIVERED: {
        title: 'Order Delivered',
        description: `Order #${orderData.orderNumber} delivered`
      },
      RETURNED: {
        title: 'Order Returned',
        description: `Order #${orderData.orderNumber} returned`
      },
      STATUS_CHANGED: {
        title: 'Order Status Updated',
        description: `Order #${orderData.orderNumber} status changed to ${orderData.status}`
      }
    };

    const actionData = actions[action];
    if (!actionData) {
      throw new Error(`Invalid order action: ${action}`);
    }

    return HistoricService.createHistoricRecord(
      userId,
      action === 'PLACED' ? 'ADD' : action === 'CANCELLED' ? 'DELETE' : 'UPDATE',
      actionData.title,
      actionData.description
    );
  }

  // Track user account events
  static async trackUserAccount(userId, action, userData) {
    const actions = {
      REGISTERED: {
        title: 'Account Created',
        description: `New account registered: ${userData.email}`
      },
      PROFILE_UPDATED: {
        title: 'Profile Updated',
        description: `Profile information updated for ${userData.email}`
      },
      PASSWORD_CHANGED: {
        title: 'Password Changed',
        description: `Password changed for account: ${userData.email}`
      },
      EMAIL_CHANGED: {
        title: 'Email Changed',
        description: `Email changed from ${userData.oldEmail} to ${userData.newEmail}`
      },
      ACCOUNT_DELETED: {
        title: 'Account Deleted',
        description: `Account deleted: ${userData.email}`
      }
    };

    const actionData = actions[action];
    if (!actionData) {
      throw new Error(`Invalid user action: ${action}`);
    }

    return HistoricService.createHistoricRecord(
      userId,
      action === 'REGISTERED' ? 'ADD' : action === 'ACCOUNT_DELETED' ? 'DELETE' : 'UPDATE',
      actionData.title,
      actionData.description
    );
  }

  // Track review and comment events
  static async trackReviewAction(userId, action, reviewData) {
    const actions = {
      REVIEW_ADDED: {
        title: 'Review Added',
        description: `Reviewed ${reviewData.productName}: ${reviewData.rating}/5 stars - "${reviewData.comment}"`
      },
      REVIEW_UPDATED: {
        title: 'Review Updated',
        description: `Updated review for ${reviewData.productName}: ${reviewData.rating}/5 stars`
      },
      REVIEW_DELETED: {
        title: 'Review Deleted',
        description: `Deleted review for ${reviewData.productName}`
      },
      COMMENT_ADDED: {
        title: 'Comment Added',
        description: `Commented on ${reviewData.productName}: "${reviewData.comment}"`
      }
    };

    const actionData = actions[action];
    if (!actionData) {
      throw new Error(`Invalid review action: ${action}`);
    }

    return HistoricService.createHistoricRecord(
      userId,
      action === 'REVIEW_ADDED' || action === 'COMMENT_ADDED' ? 'ADD' : 
      action === 'REVIEW_DELETED' ? 'DELETE' : 'UPDATE',
      actionData.title,
      actionData.description
    );
  }

  // Track admin validation events
  static async trackAdminValidation(adminId, action, validationData) {
    const actions = {
      PRODUCT_VALIDATED: {
        title: 'Product Validated',
        description: `Validated product: ${validationData.productName} by seller ${validationData.sellerEmail}`
      },
      PRODUCT_REJECTED: {
        title: 'Product Rejected',
        description: `Rejected product: ${validationData.productName} - Reason: ${validationData.reason}`
      },
      ORDER_VALIDATED: {
        title: 'Order Validated',
        description: `Validated order #${validationData.orderNumber} for ${validationData.customerEmail}`
      },
      USER_SUSPENDED: {
        title: 'User Suspended',
        description: `Suspended user: ${validationData.userEmail} - Reason: ${validationData.reason}`
      }
    };

    const actionData = actions[action];
    if (!actionData) {
      throw new Error(`Invalid admin action: ${action}`);
    }

    return HistoricService.createHistoricRecord(
      adminId,
      'VALIDATE',
      actionData.title,
      actionData.description
    );
  }

  // Batch track multiple actions
  static async trackMultipleActions(actions) {
    const results = [];
    
    for (const action of actions) {
      try {
        let result;
        
        switch (action.type) {
          case 'PRODUCT':
            result = await this.trackProductLifecycle(action.userId, action.action, action.data);
            break;
          case 'ORDER':
            result = await this.trackOrderLifecycle(action.userId, action.action, action.data);
            break;
          case 'USER':
            result = await this.trackUserAccount(action.userId, action.action, action.data);
            break;
          case 'REVIEW':
            result = await this.trackReviewAction(action.userId, action.action, action.data);
            break;
          case 'ADMIN':
            result = await this.trackAdminValidation(action.userId, action.action, action.data);
            break;
          default:
            throw new Error(`Invalid action type: ${action.type}`);
        }
        
        results.push({ success: true, action: action.action, data: result });
      } catch (error) {
        results.push({ success: false, action: action.action, error: error.message });
      }
    }
    
    return results;
  }
}

export default HistoricTracker;
