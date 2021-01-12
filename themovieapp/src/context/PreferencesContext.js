import { createContext } from 'react';

const PreferencesContext = createContext({
    theme: '', //En el tema que encuentra  activo la app
    toggleTheme: () =>{}, //Switch de dark a light
});

export default PreferencesContext;
