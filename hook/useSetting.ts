import { useContext } from 'react';

import { SettingContext } from '../context/SettingContext';

// ----------------------------------------------------------------------

const useSetting = () => useContext(SettingContext);

export default useSetting;
