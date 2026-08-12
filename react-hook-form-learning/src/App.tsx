import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Users } from "./modules/user/components/Users";
import { SignUpForm } from "./modules/auth/components/SignUpForm";
function App() {
  // Create a query client instance
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Users />
      </div>
      <div>
        <SignUpForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
