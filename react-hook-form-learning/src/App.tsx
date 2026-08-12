import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Users } from "./modules/user/components/Users";
import { SignUpForm } from "./modules/test/components/ManualForm";
function App() {
  // Create a query client instance
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* React Hook Form */}
        <Users />
      </div>
      <div>
        {/* React State Form */}
        <SignUpForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
