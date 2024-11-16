import { createContext, useContext } from 'react';
import ApiClient from '../services/api'


const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const api = ApiClient;

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}