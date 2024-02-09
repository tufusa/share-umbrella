import { useState } from "react";
import { useZxing, Result } from "react-zxing";
import styles from "./App.module.css";

export const App = () => {
  const [qrContent, setQrContent] = useState<string | null>();
  const [auth, setAuth] = useState(false);
  const onDecodeQr = (result: Result) => {
    const base64 = result.getText();
    const content = atob(base64);
    const isAuth = content === import.meta.env.VITE_AUTH_CONTENT;

    setQrContent(content);
    setAuth(isAuth);
    if (!isAuth) return;

    fetch(`${import.meta.env.VITE_API_URL}/run`, { method: "POST" })
      .then((res) => console.log(res))
      .catch((reason) => console.log(reason));
  };
  const { ref } = useZxing({
    onDecodeResult: onDecodeQr,
  });

  return (
    <main className={styles.main}>
      <span className={styles['qr-message']}>QRコードをかざしてください</span>
      <video
        ref={ref}
        className={`${styles.video} ${
          qrContent && auth && styles["video-success"]
        }`}
      />
      <div className={styles.status}>
        <span>Result:{qrContent ?? "______"}</span>
        <span>Auth:{!qrContent ? "______" : auth ? "成功" : "失敗"}</span>
        {qrContent && auth && <span className={styles['lock-open']}>ロックが開きます</span>}
      </div>
    </main>
  );
};

export default App;
