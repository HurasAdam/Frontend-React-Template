import { TanstackQueryProvider } from "./providers/query.provider";
import { AppRoutes } from "./routes/app/AppRoutes";

function App() {
  return (
    <TanstackQueryProvider>
      <AppRoutes />
    </TanstackQueryProvider>
  );
}

export default App;
