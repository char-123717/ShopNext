//PROVIDERS(iNJECT TOOLS) → wraps the entire app to provide global state and query management
//This is where we set up Redux and React Query for the whole app

// Marks this file as a Client Component (Next.js App Router)
// Required because we are using hooks and client-side libraries (Redux, React Query)
"use client";

// Provider from Redux → used to make the Redux store available to all components
import { Provider } from "react-redux";
// QueryClient → creates a client instance to manage queries (cache, fetching, etc.)
// QueryClientProvider → provides the client to the entire React app
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";

// Create a QueryClient instance (only once, outside the component)
const queryClient = new QueryClient({
  defaultOptions: {
    // How long data is considered "fresh" (no refetch needed)
    queries: { 
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      refetchOnWindowFocus: false, // Disable automatic refetch when user switches back to the tab
    },
  },
});

// children → all components inside this provider (your entire app/layout)
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Redux Provider → injects the store into React Context
    // So any component can use useSelector / useDispatch
    <Provider store={store}>
      {/* React Query Provider → makes queryClient available globally */}
      <QueryClientProvider client={queryClient}>
        {children} {/* Render all child components inside both providers */}
      </QueryClientProvider>
    </Provider>
  );
}
  
