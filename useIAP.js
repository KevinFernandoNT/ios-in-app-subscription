import { useEffect, useState } from 'react';
import * as RNIap from 'react-native-iap';

const productIds = ['com.example.subscription1', 'com.example.subscription2'];

const useIAP = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        await RNIap.initConnection();
        const products = await RNIap.getSubscriptions({ skus: productIds });
        setSubscriptions(products);
      } catch (error) {
        console.error('Error fetching subscriptions:',error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
    return () => {
      RNIap.endConnection();
    };
  }, []);

  const handlePurchase = async (productId) => {
    try {
      await RNIap.requestSubscription(productId);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return { subscriptions, loading, handlePurchase };
};

export default useIAP;
