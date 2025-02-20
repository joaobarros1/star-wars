import { DataProvider } from "./context/DataContext";
import CharacterList from "./components/CharacterList";

function App() {
    return (
        <DataProvider>
            <CharacterList />
        </DataProvider>
    );
}

export default App;
