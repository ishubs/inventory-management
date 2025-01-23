import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/index.ts'
import { theme } from 'antd';
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#7e8947"

          },
          components: {

            Switch: {
              colorPrimary: "#7e8947"
            }
          }
        }}


      >
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
