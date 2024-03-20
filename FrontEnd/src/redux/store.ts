import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice';

const persistConfig = {
    key: 'root',
    // version: 1,
    storage,
    blacklist: []
    // whitelist: ['key1', 'key2'],
}

const rootReducer = combineReducers({auth: authReducer, user: userReducer, product: productReducer}); 

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

const persistor = persistStore(store);

export { store, persistor };