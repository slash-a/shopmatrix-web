import { useContext } from 'react';

import { SettingsContext } from '../context/SettingContext';

// ----------------------------------------------------------------------

const useSetting = () => useContext(SettingContext);

export default useSetting;
