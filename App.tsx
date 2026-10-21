import BootstrapScreen from './src/app/BootstrapScreen';
import { ThemeProvider } from './src/theme/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <BootstrapScreen />
    </ThemeProvider>
  );
}
