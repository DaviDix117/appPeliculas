import { createContext } from 'react';


const PreferencesContext = createContext({
    theme: '', //En el tema que encuantra  activo la app
    toggleTheme: () =>{}, //Switch de dark a ligth
});

export default PreferencesContext;
