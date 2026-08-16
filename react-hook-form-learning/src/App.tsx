import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SignUpForm } from "./modules/test/components/ManualForm";
import { AuthFormRHF } from "./modules/auth/components/ValidatedForm";

function App() {
  // Create a query client instance
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* React Hook Form */}
        <AuthFormRHF />
      </div>
      <div>
        {/* React State Form */}
        <SignUpForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
