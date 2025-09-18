import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/68cba29aad8aa6192a46348c/1j5dn6br7'; // 🔑 replace with your real property ID
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // nothing renders, widget attaches itself
};

export default TawkToChat;
