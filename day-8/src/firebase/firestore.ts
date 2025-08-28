import firestore from '@react-native-firebase/firestore';

export const addData = async (collectionName: string, data: any) => {
  try {
    const docRef = await firestore().collection(collectionName).add(data);
    return docRef.id;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const getData = async (collectionName: string) => {
  try {
    const querySnapshot = await firestore().collection(collectionName).get();
    return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const listenToData = (collectionName: string, callback: (data: any[]) => void) => {
  const unsubscribe = firestore().collection(collectionName).onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
  return unsubscribe;
};