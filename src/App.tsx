import { useState } from "react";
import { useZxing, Result } from "react-zxing";
import styles from "./App.module.css";

export const App = () => {
  const [qrContent, setQrContent] = useState<string | null>();
  const [auth, setAuth] = useState(false);
  const onDecodeQr = (result: Result) => {
    const base64 = result.getText();
    const content = atob(base64);
    setQrContent(content);
    setAuth(content === import.meta.env.VITE_AUTH_CONTENT);
  };
  const { ref } = useZxing({
    onDecodeResult: onDecodeQr,
  });

  return (
    <main className={styles.main}>
      <video ref={ref} className={styles.video} />
      <div className={styles.status}>
        <span>Result:{qrContent}</span>
        <span>Auth:{!qrContent ? "" : auth ? "成功" : "失敗"}</span>
      </div>
    </main>
  );
};

export default App;
