import { MainLayout } from '../layouts';
import { Button } from '../components';

export function HomePage() {
  return (
    <MainLayout>
      <h1>Test home</h1>
      <Button label="test button" ariaLabel="test button" />
    </MainLayout>
  );
}
