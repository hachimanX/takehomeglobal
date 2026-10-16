import { renderToString } from 'react-dom/server';
import App from './App';
import { allRoutes, headFor } from './routes';

export { allRoutes, headFor };

export function render(path: string): string {
  return renderToString(<App initialPath={path} />);
}