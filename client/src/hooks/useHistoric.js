import { useCallback } from 'react';
import HistoricAPI from '../API/Historic';

const useHistoric = () => {
  // Track user actions with consistent formatting
  const trackAction = useCallback(async (userId, action, title, description, metadata = {}) => {
    try {
      const historicData = {
        userId,
        title,
        action,
        discription: description,
        ...metadata
      };

      await HistoricAPI.createHistoric(historicData);
      return { success: true };
    } catch (error) {
      console.error('Error tracking historic action:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Predefined action methods for consistency
  const trackProductAction = useCallback(async (userId, action, productName, additionalInfo = '') => {
    const descriptions = {
      ADD: `Added new product: ${productName}`,
      UPDATE: `Updated product: ${productName}`,
      DELETE: `Deleted product: ${productName}`,
      COMMENT: `Commented on product: ${productName}`,
      REVIEW: `Reviewed product: ${productName}`
    };

    return trackAction(userId, action, `Product ${action}`, descriptions[action] || additionalInfo);
  }, [trackAction]);

  const trackOrderAction = useCallback(async (userId, action, orderId, additionalInfo = '') => {
    const descriptions = {
      PLACE: `Order #${orderId} placed`,
      UPDATE: `Order #${orderId} updated`,
      CANCEL: `Order #${orderId} cancelled`,
      VALIDATE: `Order #${orderId} validated`
    };

    return trackAction(userId, action, `Order ${action}`, descriptions[action] || additionalInfo);
  }, [trackAction]);

  const trackUserAction = useCallback(async (userId, action, target, additionalInfo = '') => {
    const descriptions = {
      PROFILE_UPDATE: `Profile updated: ${target}`,
      PASSWORD_CHANGE: `Password changed`,
      EMAIL_CHANGE: `Email changed to ${target}`,
      ACCOUNT_CREATE: `Account created`
    };

    return trackAction(userId, action, `User ${action}`, descriptions[action] || additionalInfo);
  }, [trackAction]);

  return {
    trackAction,
    trackProductAction,
    trackOrderAction,
    trackUserAction
  };
};

export default useHistoric;
