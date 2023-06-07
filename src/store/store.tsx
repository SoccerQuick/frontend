import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './reducers';

// store
const store = configureStore({ reducer: persistedReducer });

//persistor
const persistor = persistStore(store);

export { store, persistor };
