import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import CharacterList from "./components/CharacterList";
import Login from "./components/Login";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const App = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <main className="app">
            {isAuthenticated ? (
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            ) : (
                <p className="login-phrase">Please log in</p>
            )}
            {isAuthenticated ? <CharacterList /> : <Login />}
        </main>
    );
};

const queryClient = new QueryClient();


const AppWrapper = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default AppWrapper;
