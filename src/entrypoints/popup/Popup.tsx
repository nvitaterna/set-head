import '@mantine/core/styles.css';

import { App } from '@/app/app';
import { Providers } from '@/providers/providers';

function Popup() {
  return (
    <Providers>
      <div
        style={{
          width: 720,
          height: 480,
          maxHeight: 480,
          maxWidth: 720,
        }}>
        <App />
      </div>
    </Providers>
  );
}

export default Popup;
